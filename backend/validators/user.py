import re

from backend.validators.common import Validator

class UserValidator(Validator):
    @staticmethod
    def is_email_valid(email):
        regex = r'^[\w+%.-]+@[\w.-]+\.[A-Za-z]{2,7}'
        return re.fullmatch(regex, email)

    @staticmethod
    def password_match(password, password2):
        return password == password2

    @staticmethod
    def is_password_valid(password):
        has_min_length = len(password) >= 8
        has_uppercase = any([c.isupper() for c in password])
        has_number = any([c.isdigit() for c in password])

        return has_min_length and has_uppercase and has_number

    def has_valid_password_inputs(self, password, password_confirm):
        if not self.password_match(password, password_confirm):
            self.error = 'Passwords must match'
            return False 
        if not self.is_password_valid(password):
            self.error = 'Password must contain at least 8 characters, 1 uppercase letter, and 1 number'
            return False 
        return True 
    
    def is_login_json_valid(self, login_json):
        return not self.has_missing_body_or_empty_fields(login_json, 'email', 'password')
    
    def is_signup_json_valid(self, signup_json):
        if self.has_missing_body_or_empty_fields(signup_json, 'firstname', 'lastname', 'email', 'password', 'passwordConfirm'):
            return False 
        email = signup_json['email']
        password = signup_json['password']
        password_confirm = signup_json['passwordConfirm']
        if not self.is_email_valid(email):
            self.error = 'Email is not valid'
            return False 
        return self.has_valid_password_inputs(password, password_confirm)

    def is_modify_user_json_valid(self, modified_user_json):
        if self.has_missing_body_or_empty_fields(modified_user_json, 'firstname', 'lastname', 'email'):
            return False 
        email = modified_user_json['email']
        if not self.is_email_valid(email):
            self.error = 'Email is not valid'
            return False 
        return True 
    
    def is_change_password_json_valid(self, change_password_json):
        if self.has_missing_body_or_empty_fields(change_password_json, 'passwordCurrent', 'passwordNew', 'passwordConfirm'):
            return False 
        password = change_password_json['passwordNew']
        password_confirm = change_password_json['passwordConfirm']
        return self.has_valid_password_inputs(password, password_confirm)
    
    def is_send_reset_password_link_json_valid(self, send_reset_password_link_json):
        return not self.has_missing_body_or_empty_fields(send_reset_password_link_json, 'email')
    
    def is_reset_password_json_valid(self, reset_password_json):
        if self.has_missing_body_or_empty_fields(reset_password_json, 'password', 'passwordConfirm'):
            return False 
        password = reset_password_json['password']
        password_confirm = reset_password_json['passwordConfirm']
        return self.has_valid_password_inputs(password, password_confirm)