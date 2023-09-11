import re 

class Validator():
    @staticmethod
    def has_empty_fields(*args, req_json):
        for field in args:
            if field not in req_json or not req_json[field].strip():
                return True
        return False

    def has_missing_body_or_empty_fields(self, json, *args):
        if not json:
            self.error = 'Missing request body'
            return True 
        if self.has_empty_fields(*args, req_json=json):
            self.error = 'Please fill in all the required field(s)'
            return True  
        return False   