import re 

class Validator():
    @classmethod 
    def check_empty_fields(cls, *args, req_json):
        for field in args:
            if field not in req_json or not req_json[field].strip():
                return True
        return False

    @classmethod 
    def check_valid_email(cls, email):
        regex = r'^[\w+%.-]+@[\w.-]+\.[A-Za-z]{2,7}'
        return re.fullmatch(regex, email)

    def request_has_missing_body_or_empty_fields(self, json, *args):
        if not json:
            self.error = 'Missing request body'
            return True 
        if self.check_empty_fields(*args, req_json=json):
            self.error = 'Please fill in all the required field(s)'
            return True  
        return False   