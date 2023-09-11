from backend.validators.common import Validator

class TaskValidator(Validator):
    def is_task_json_valid(self, task_json):
        if self.has_missing_body_or_empty_fields(task_json, 'status'):
            return False 
        if 'name' in task_json and self.has_missing_body_or_empty_fields(task_json, 'name', 'deadline', 'status'):
            return False
        return True 
        
