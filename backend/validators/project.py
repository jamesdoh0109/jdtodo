from backend.validators.common import Validator

class ProjectValidator(Validator):
    def validate_project_input(self, project_json):
        if self.request_has_missing_body_or_empty_fields(project_json, 'name'):
            return False 
        project_name = project_json['name']
        if len(project_name) > 25:
            self.error = 'Name must be less than 25 characters'
            return False 
        return True 
        