from django.contrib import admin

from .models import Application, Event, EventRole, Reward, Role, Ship, ShipUser, Title

admin.site.register(Ship)
admin.site.register(Event)
admin.site.register(Role)
admin.site.register(ShipUser)
admin.site.register(Application)
admin.site.register(Reward)
admin.site.register(Title)
admin.site.register(EventRole)
