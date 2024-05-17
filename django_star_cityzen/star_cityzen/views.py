import json

from django.db import models
from rest_framework import status
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .models import Application, Event, EventRole, Reward, Role, Ship, ShipUser, Title
from .permissions import IsAdmin
from .serializers import (
    EventSerializer,
    RewardSerializer,
    RoleSerializer,
    ShipSerializer,
    ShipUserSerializer,
    TitleSerializer,
    UserRegistrationSerializer,
    UserRewardCostSerializer,
)


class CustomTokenObtainPairView(TokenObtainPairView):
    pass


class CustomTokenRefreshView(TokenRefreshView):

    def post(self, request, *args, **kwargs) -> Response:
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            access_token = response.data["access"]
            response.data["access"] = access_token
            refresh_token = response.data["refresh"]
            response.data["refresh"] = refresh_token
        return response


class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        pref = user.pref.first()
        if pref:
            pref = pref.id
            pref = Title.objects.get(id=pref)
            pref = TitleSerializer(pref).data
        user = {"username": user.username, "pref": pref}
        return Response(user)


class RegisterUserView(APIView):

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        user = ShipUser.objects.get(id=request.data.get("id"))
        if user.is_admin:
            return Response({"message": "You can't delete admin"}, status=status.HTTP_400_BAD_REQUEST)
        user.delete()
        return Response(status=status.HTTP_200_OK)


class ShipsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        ships = Ship.objects.all()
        serializer = ShipSerializer(ships, many=True)
        user_ships = request.user.ships.all()
        user_ships_serializer = ShipSerializer(user_ships, many=True)
        return Response({"all_ships": serializer.data, "user_ships": user_ships_serializer.data})

    def post(self, request, format=None):
        user = request.user
        ship_id = request.data.get("id")
        try:
            ship = Ship.objects.get(pk=ship_id)
        except Ship.DoesNotExist:
            return Response({"message": "Ship not found"}, status=status.HTTP_404_NOT_FOUND)
        user.ships.add(ship)
        return Response(status=status.HTTP_200_OK)

    def delete(self, request, format=None):
        user = request.user
        ship_id = request.data.get("id")
        try:
            ship = Ship.objects.get(pk=ship_id)
        except Ship.DoesNotExist:
            return Response({"message": "Ship not found"}, status=status.HTTP_404_NOT_FOUND)
        user.ships.remove(ship)
        return Response(status=status.HTTP_200_OK)


class ShipControlView(APIView):
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    permission_classes = [IsAdmin]
    serializer_class = ShipSerializer

    def get(self, request, format=None):
        ships = Ship.objects.all()
        serializer = ShipSerializer(ships, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ShipSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        ship = Ship.objects.get(id=request.data.get("id"))
        ship.delete()
        return Response(status=status.HTTP_200_OK)

    def put(self, request, format=None):

        ship = Ship.objects.get(id=request.data.get("id"))
        ship_data = request.data
        ship_data["image"] = ship.image
        serializer = ShipSerializer(ship, data=ship_data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ShowUsers(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        users = ShipUser.objects.filter(is_admin=False)
        serializer = ShipUserSerializer(users, many=True)
        return Response(serializer.data)


class AdminRoleView(APIView):
    permission_classes = [IsAdmin]

    def get(self, request, format=None):
        roles = Role.objects.all()
        serializer = RoleSerializer(roles, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        role = RoleSerializer(data=request.data)
        if role.is_valid():
            role.save()
            return Response(status=status.HTTP_200_OK)
        return Response(role.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        role = Role.objects.get(id=request.data.get("id"))
        role.delete()
        return Response(status=status.HTTP_200_OK)

    def put(self, request, format=None):
        role = Role.objects.get(id=request.data.get("id"))
        role_data = request.data
        serializer = RoleSerializer(role, data=role_data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EventsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = request.user
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        user_applications = Application.objects.filter(user=user)
        events = Event.objects.filter(application__in=user_applications).distinct()
        appliedEvents = EventSerializer(events, many=True)
        return Response({"all_events": serializer.data, "applied_events": appliedEvents.data})


class AdminEventsView(APIView):
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    permission_classes = [IsAdmin]

    def get(self, request, format=None):
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        event = EventSerializer(data=request.data)
        if event.is_valid():
            event = event.save()
            try:
                roles_data = json.loads(request.data.get("roles"))
                for role in roles_data:
                    role_id = role.get("role_id")
                    max_users = role.get("max_users")
                    event_role = EventRole.objects.create(role_id=role_id, max_users=max_users)
                    event.roles.add(event_role)
            except Exception as e:
                event.delete()
                return Response({"message": "Error while creating event roles"}, status=status.HTTP_400_BAD_REQUEST)
            return Response(status=status.HTTP_200_OK)
        return Response(event.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, format=None):
        event = Event.objects.get(id=request.data.get("id"))
        event.delete()
        return Response(status=status.HTTP_200_OK)


class IsAdminView(APIView):
    permission_classes = [IsAdmin]

    def get(self, request, format=None):
        return Response(status=status.HTTP_200_OK)


class ConfirmApplicationView(APIView):
    permission_classes = [IsAdmin]

    def post(self, request, format=None):
        event_id = request.data.get("eventId")
        event_role_id = request.data.get("roleId")
        user_id = request.data.get("userId")
        application = Event.objects.get(pk=event_id).application.get(user_id=user_id, event_role_id=event_role_id)
        if application.is_conf:
            application.is_conf = False
        else:
            application.is_conf = True
        application.save()
        return Response(status=status.HTTP_200_OK)


class AdminTitleView(APIView):
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    permission_classes = [IsAdmin]

    def post(self, request, format=None):
        title = TitleSerializer(data=request.data)
        if title.is_valid():
            title.save()
            return Response(status=status.HTTP_200_OK)
        return Response(title.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, format=None):
        titles = Title.objects.all()
        serializer = TitleSerializer(titles, many=True)
        return Response(serializer.data)

    def delete(self, request, format=None):
        title = Title.objects.get(id=request.data.get("id"))
        title.delete()
        return Response(status=status.HTTP_200_OK)

    def put(self, request, format=None):
        title = Title.objects.get(id=request.data.get("id"))
        title_data = request.data
        serializer = TitleSerializer(title, data=title_data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserApplicationView(APIView):
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        role_id = request.data.get("roleId")
        event_id = request.data.get("eventId")
        user = request.user
        try:
            event = Event.objects.get(pk=event_id)
            role = event.roles.get(pk=role_id)
        except (EventRole.DoesNotExist, Event.DoesNotExist):
            return Response({"message": "Role or Event not found"}, status=status.HTTP_404_NOT_FOUND)
        if role.application_set.count() >= role.max_users:
            return Response({"message": "Max users for this role reached"}, status=status.HTTP_400_BAD_REQUEST)
        application = Application.objects.create(user=user, event_role=role)
        event.application.add(application)
        return Response(status=status.HTTP_200_OK)

    def delete(self, request, format=None):
        role_id = request.data.get("roleId")
        event_id = request.data.get("eventId")
        user = request.user
        try:
            event = Event.objects.get(pk=event_id)
            role = event.roles.get(pk=role_id)
        except (EventRole.DoesNotExist, Event.DoesNotExist):
            return Response({"message": "Role or Event not found"}, status=status.HTTP_404_NOT_FOUND)
        application = Application.objects.get(user=user, event_role=role)
        event.application.remove(application)
        application.delete()
        return Response(status=status.HTTP_200_OK)


class UsersAndRewars(APIView):
    permission_classes = [IsAdmin]

    def post(self, request, format=None):
        try:
            user_id = request.data.get("userId")
            reward_id = request.data.get("rewardId")
            user = ShipUser.objects.get(pk=user_id, is_superuser=False)
            reward = Reward.objects.get(pk=reward_id)
        except (ShipUser.DoesNotExist, Reward.DoesNotExist):
            return Response({"message": "User or Reward not found"}, status=status.HTTP_404_NOT_FOUND)
        if reward in user.rewards.all():
            user.rewards.remove(reward)
        else:
            user.rewards.add(reward)
        return Response(status=status.HTTP_200_OK)


class RewardIdView(APIView):
    permission_classes = [IsAdmin]

    def post(self, request, format=None):
        users_ids = request.data.get("users_ids")
        users = ShipUser.objects.filter(id__in=users_ids)
        rewards_data = {}
        for user in users:
            rewards_data[user.id] = RewardSerializer(user.rewards.all(), many=True).data
        return Response(status=status.HTTP_200_OK, data=rewards_data)


class RewardsView(APIView):
    permission_classes = [IsAdmin]
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def post(self, request, format=None):
        reward = RewardSerializer(data=request.data)
        if reward.is_valid():
            reward.save()
            return Response(status=status.HTTP_200_OK)
        return Response(reward.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, format=None):
        rewards = Reward.objects.all()
        serializer = RewardSerializer(rewards, many=True)
        return Response(serializer.data)

    def delete(self, request, format=None):
        reward = Reward.objects.get(id=request.data.get("id"))
        reward.delete()
        return Response(status=status.HTTP_200_OK)


class UserRewardsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_rewards = request.user.rewards.all()
        serializer = RewardSerializer(user_rewards, many=True)
        return Response(serializer.data)


class RatingView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_rewards = (
            ShipUser.objects.filter(is_admin=False)
            .annotate(reward_cost=models.Sum("rewards__cost"))
            .values_list("username", "reward_cost")
        )
        serializer = UserRewardCostSerializer(
            [{"username": username, "reward_cost": reward_cost} for username, reward_cost in user_rewards], many=True
        )
        return Response(serializer.data)
