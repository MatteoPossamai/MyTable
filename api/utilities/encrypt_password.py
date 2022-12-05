import hashlib

class Encryptor:
    """
    Description: This function encrypts the password using SHA256 algorithm and checks
    if a given password is the same as the encrypted password.
    """

    @staticmethod
    def encrypt(password):
        """
        Description: This function encrypts the password
        """
        binary_password = password.encode("utf-8")
        encrypted_password = hashlib.sha256(binary_password)
        return encrypted_password.hexdigest()

    @classmethod
    def check_password(cls, password, encrypted_password):
        """
        Description: This function checks if the given password is the same as the encrypted password
        """
        return cls.encrypt(password) == encrypted_password
    