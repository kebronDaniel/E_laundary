from django.shortcuts import render, redirect
from .forms import UserRegisterForm, ProductCreateForm
from django.contrib import messages


def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            messages.success(request,f'Account Created for {username}!')
            return redirect('login')
    else:
        form = UserRegisterForm()
    return render(request, 'users/register.html', {'form': form})

def createProduct(request):
    if request.method == 'POST':
        p_form = ProductCreateForm(request.POST,request.FILES)
        if p_form.is_valid():
            p_form.save()
            messages.success(request,f'A new product is created!')
            return redirect('store')
    else:
        p_form = ProductCreateForm()
        
    return render(request,'users/create_product.html',{'p_form': p_form})



