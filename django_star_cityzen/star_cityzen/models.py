from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.db.models.signals import m2m_changed, post_delete, pre_delete
from django.dispatch import receiver


class ShipUserManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError("The Username must be set")
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(username, password, **extra_fields)


class Ship(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    image = models.ImageField(upload_to="ships")
    price = models.DecimalField(max_digits=10, decimal_places=0)
    count = models.IntegerField(default=0)

    def __str__(self):
        return self.name


class Title(models.Model):
    name = models.CharField(max_length=15)
    cost = models.DecimalField(max_digits=10, decimal_places=0)
    color = models.CharField(max_length=7, default="#000000")
    emoji = models.CharField(max_length=2, default="🌟")

    def __str__(self):
        return self.name


class Reward(models.Model):
    name = models.CharField(max_length=20)
    image = models.ImageField(upload_to="rewards")
    cost = models.DecimalField(max_digits=10, decimal_places=0)


class ShipUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=15, unique=True)
    ships = models.ManyToManyField(Ship, blank=True)
    rewards = models.ManyToManyField(Reward, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    pref = models.ManyToManyField(Title, blank=True)
    objects = ShipUserManager()
    avatar = models.URLField(max_length=200, blank=True)
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username


@receiver(m2m_changed, sender=ShipUser.rewards.through)
def update_user_pref(sender, instance, **kwargs):
    if kwargs["action"] == "post_add" or kwargs["action"] == "post_remove":
        total_rewards_cost = instance.rewards.aggregate(total_cost=models.Sum("cost"))["total_cost"]
        if total_rewards_cost is None:
            total_rewards_cost = 0
        titles = Title.objects.order_by("-cost")
        for title in titles:
            if total_rewards_cost >= title.cost:
                instance.pref.clear()
                instance.pref.add(title)
                break
        else:
            instance.pref.set("")
            instance.save()


@receiver(pre_delete, sender=ShipUser)
def update_ship_count_on_user_delete(sender, instance, **kwargs):
    for ship in instance.ships.all():
        ship.count -= 1
        ship.save()


@receiver(m2m_changed, sender=ShipUser.ships.through)
def update_ship_count(sender, instance, action, **kwargs):
    if action == "post_add" or action == "post_remove":
        for ship in Ship.objects.all():
            ship.count = ship.shipuser_set.count()
            ship.save()


@receiver(post_delete)
def delete_image_on_post_delete(sender, instance, **kwargs):
    # Проверяем, что у модели есть поле изображения
    if hasattr(instance, "image"):
        # Удаляем связанное изображение при удалении экземпляра модели
        instance.image.delete(False)


class Role(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name


class EventRole(models.Model):
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    max_users = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.role.name}"


class Application(models.Model):
    user = models.ForeignKey(ShipUser, on_delete=models.CASCADE)
    event_role = models.ForeignKey(EventRole, on_delete=models.CASCADE)
    is_conf = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} - {self.event_role}"


class Event(models.Model):
    name = models.CharField(max_length=100)
    datetime = models.DateTimeField()
    description = models.TextField()
    image = models.ImageField(upload_to="events")
    link = models.URLField(max_length=200)
    roles = models.ManyToManyField(EventRole, blank=True)
    application = models.ManyToManyField(Application, blank=True)

    def __str__(self):
        return self.name


@receiver(pre_delete, sender=Event)
def delete_related_event_roles(sender, instance, **kwargs):
    instance.roles.all().delete()
