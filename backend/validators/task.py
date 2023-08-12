from backend.validators.common import Validator

class TaskValidator(Validator):
    def validate_task_inputs(self, task_json):
        if self.request_has_missing_body_or_empty_fields(task_json, 'name', 'deadline', 'status'):
            return False 
        return True 
        
        
