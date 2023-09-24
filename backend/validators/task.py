import datetime

from backend.validators.common import Validator

class TaskValidator(Validator):
    @staticmethod 
    def is_task_name_valid(name):
        if len(name) > 60:
            return False
        return True

    @staticmethod
    def is_task_deadline_valid(deadline):
        if datetime.datetime.fromisoformat(deadline[:-1]) < datetime.datetime.now():
            return False  
        return True 
    
    @staticmethod
    def is_task_description_valid(description):
        if description and len(description) > 300:
            return False
        return True 
    
    def is_task_json_valid(self, task_json):
        # clicking checkbox to toggle status
        if self.has_missing_body_or_empty_fields(task_json, 'status'):
            return False
        # submitting the actual task form  
        if 'name' in task_json:
            if self.has_missing_body_or_empty_fields(task_json, 'name', 'deadline', 'status'):
                return False
            if not self.is_task_name_valid(task_json['name']):
                self.error = 'Task name must be less than 60 characters'
                return False 
            if not self.is_task_deadline_valid(task_json['deadline']):
                self.error = "Task deadline cannot be in the past"
                return False 
            if not self.is_task_description_valid(task_json['description']):
                self.error = 'Task description must be less than 300 characters'
                return False 
        return True 

        
