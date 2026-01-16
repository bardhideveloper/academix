from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('email', 'password', 'first_name', 'last_name')

    def create(self, validated_data):
        return User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
        )


from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate

User = get_user_model()

class LoginSerializer(serializers.Serializer):
    identifier = serializers.CharField() 
    password = serializers.CharField()

    def validate(self, data):
        identifier = data['identifier']
        password = data['password']
        user = authenticate(username=identifier, password=password)

        if not user:
            try:
                user_obj = User.objects.get(email=identifier)
                user = authenticate(username=user_obj.username, password=password)
            except User.DoesNotExist:
                user = None

        if not user:
            raise serializers.ValidationError("Invalid credentials")

        data['user'] = user
        return data
