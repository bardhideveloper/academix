from users.repositories.user_repository import UserRepository


class UserService:

    @staticmethod
    def register_user(email: str, password: str, first_name: str, last_name: str, role: str = 'student'):
        existing_user = UserRepository.get_by_email(email)
        if existing_user:
            raise ValueError("User with this email already exists")

        return UserRepository.create_user(
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            role=role
        )

    @staticmethod
    def list_users():
        return UserRepository.list_users()
