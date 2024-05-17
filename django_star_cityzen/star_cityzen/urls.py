from django.urls import path

from . import views

urlpatterns = [
    path("admin/ships/", views.ShipControlView.as_view(), name="ship_control"),
    path("admin/events/", views.AdminEventsView.as_view(), name="event_control"),
    path("admin/users/", views.ShowUsers.as_view(), name="show_users"),
    path("admin/rewards/", views.RewardsView.as_view(), name="rewards"),
    path("admin/add_user_reward/", views.UsersAndRewars.as_view(), name="add_user_reward"),
    path("admin/title/", views.AdminTitleView.as_view(), name="title_control"),
    path("admin/roles/", views.AdminRoleView.as_view(), name="roles"),
    path("admin/application_confirm", views.ConfirmApplicationView.as_view(), name="confirm_application"),
    path("admin/users_and_rewards/", views.RewardIdView.as_view(), name="users_and_rewards"),
    path("user_rewards/", views.UserRewardsView.as_view(), name="user_rewards"),
    path("events/", views.EventsView.as_view(), name="events"),
    path("ships/", views.ShipsView.as_view(), name="ships"),
    path("rating/", views.RatingView.as_view(), name="rating"),
    path("application/", views.UserApplicationView.as_view(), name="application"),
    path("token/refresh/", views.CustomTokenRefreshView.as_view(), name="token_refresh"),
    path("login/", views.CustomTokenObtainPairView.as_view(), name="login"),
    path("register/", views.RegisterUserView.as_view(), name="register"),
    path("is_admin/", views.IsAdminView.as_view(), name="is_admin"),
    path("user/", views.CurrentUserView.as_view(), name="user"),
]
