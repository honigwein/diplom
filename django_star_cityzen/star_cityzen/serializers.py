from rest_framework import serializers

from .models import Application, Event, EventRole, Reward, Role, Ship, ShipUser, Title


class ShipSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ship
        fields = "__all__"


class EventRoleSerializer(serializers.ModelSerializer):
    role = serializers.ReadOnlyField(source="role.name")
    role_id = serializers.ReadOnlyField(source="role.id")

    class Meta:
        model = EventRole
        fields = "__all__"


# Пользователи и их корабли
class ShipUserSerializer(serializers.ModelSerializer):
    ships = ShipSerializer(many=True, read_only=True)

    class Meta:
        model = ShipUser
        fields = "__all__"


# Регистрация
class UserRegistrationSerializer(serializers.ModelSerializer):

    class Meta:
        model = ShipUser
        fields = ("username", "password", "avatar")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = ShipUser.objects.create_user(password=password, **validated_data)
        return user


# Все роли
class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = "__all__"


# Награды
class RewardSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reward
        fields = "__all__"


# Заявки с именем пользователя
class ApplicationSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")
    user_id = serializers.ReadOnlyField(source="user.id")

    class Meta:
        model = Application
        fields = "__all__"


# Ивенты, с заявками (с именами пользвоателей) и ролями
class EventSerializer(serializers.ModelSerializer):
    application = ApplicationSerializer(many=True, read_only=True)
    roles = EventRoleSerializer(many=True, read_only=True)

    class Meta:
        model = Event
        fields = "__all__"


# Для вывода пользователя и стоимости его наград
class UserRewardCostSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=100)
    reward_cost = serializers.FloatField()


# Должности
class TitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Title
        fields = "__all__"


class RewardIdSerializer(serializers.Serializer):
    class Meta:
        fields = ["id"]
