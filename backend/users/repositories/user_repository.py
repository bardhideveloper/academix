from users.models import User


class UserRepository:
    @staticmethod
    def get_by_id(user_id: int) -> User | None:
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            return None

    @staticmethod
    def get_by_email(email: str) -> User | None:
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            return None

    @staticmethod
    def create_user(**data) -> User:
        return User.objects.create_user(**data)

    @staticmethod
    def list_users():
        return User.objects.all()
