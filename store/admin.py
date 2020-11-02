from django.contrib import admin
from .models import *

# Superuser = kebron
# password = the nissan_one

admin.site.register(Customer)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Product)
admin.site.register(ShippingAddress)
