from backend.validators.common import Validator

class UserValidator(Validator):
    def validate_modify_user_inputs(self, modified_user_json):
        if self.request_has_missing_body_or_empty_fields(modified_user_json, 'firstname', 'lastname', 'email'):
            return False 
        email = modified_user_json['email']
        if not self.check_valid_email(email):
            self.error = 'Please enter a valid email'
            return False 
        return True 