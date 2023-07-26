from backend.validators.common import Validator

class AuthValidator(Validator):
    @classmethod
    def check_verify_password(cls, password, password2):
        return password == password2

    @classmethod
    def check_valid_password(cls, password):
        return (len(password) >= 8 and any([c.isupper() for c in password]) and any([c.isdigit() for c in password]))
        
    def request_has_valid_password_inputs(self, password, password_confirm):
        if not self.check_verify_password(password, password_confirm):
            self.error = 'Passwords must match'
            return False 
        if not self.check_valid_password(password):
            self.error = 'Password must contain at least 8 characters, 1 uppercase letter, and 1 number'
            return False 
        return True 

    def validate_login_inputs(self, login_json):
        if self.request_has_missing_body_or_empty_fields(login_json, 'email', 'password'):
            return False 
        return True 
    
    def validate_signup_inputs(self, signup_json):
        if self.request_has_missing_body_or_empty_fields(signup_json, 'firstname', 'lastname', 'email', 'password', 'password2'):
            return False 
        email = signup_json['email']
        password = signup_json['password']
        password_confirm = signup_json['password2']
        if not self.check_valid_email(email):
            self.error = 'Email is not valid'
            return False 
        if not self.request_has_valid_password_inputs(password, password_confirm):
            return False 
        return True 
    
    def validate_change_password_inputs(self, change_password_json):
        if self.request_has_missing_body_or_empty_fields(change_password_json, 'currentPassword', 'newPassword', 'confirmPassword'):
            return False 
        password = change_password_json['newPassword']
        password_confirm = change_password_json['confirmPassword']
        if not self.request_has_valid_password_inputs(password, password_confirm):
            return False 
        return True 
    
    def validate_send_reset_password_link_input(self, send_reset_password_link_json):
        if self.request_has_missing_body_or_empty_fields(send_reset_password_link_json, 'email'):
            return False 
        return True 
    
    def validate_reset_password_inputs(self, reset_password_json):
        if self.request_has_missing_body_or_empty_fields(reset_password_json, 'password', 'password2'):
            return False 
        password = reset_password_json['password']
        password_confirm = reset_password_json['password2']
        if not self.request_has_valid_password_inputs(password, password_confirm):
            return False 
        return True 
         
        

