from backend.validators.user import UserValidator
from backend.validators.project import ProjectValidator
from backend.validators.task import TaskValidator
from backend.utils.exceptions import BadRequestException, UnauthorizedException, NotFoundException, AccessDeniedException, ServerException, IntegrityException

def validate_user_json(validation_method_name, key='error'):
    def decorator(func):
        def wrapper(user_json, *args):
            validator = UserValidator()
            validate = getattr(validator, validation_method_name)
            has_error = not validate(user_json)
            if has_error and key == 'error':
                return {key: True, 'message': validator.error, 'status_code': 400}
            elif has_error:
                return {key: None, 'message': validator.error, 'status_code': 400}
            return func(user_json, *args)
        return wrapper 
    return decorator
    
def validate_project_json(project_type):
    def decorator(func):
        def wrapper(project_json, *args):
            validator = ProjectValidator()
            if not validator.is_project_json_valid(project_json):
                return {project_type: None, 'message': validator.error, 'status_code': 400}
            return func(project_json, *args)
        return wrapper
    return decorator 

def validate_task_json(task_type):
    def decorator(func):
        def wrapper(task_json, user_id, project_or_task_id):
            validator = TaskValidator()
            if not validator.is_task_json_valid(task_json):
                return {task_type: None, 'message': validator.error, 'status_code': 400}
            return func(task_json, user_id, project_or_task_id)
        return wrapper
    return decorator 

def handle_exceptions(data_key):
    def decorator(func):
        def wrapper(*args, **kwargs):
            try:
                return func(*args, **kwargs)
            except (BadRequestException, UnauthorizedException, NotFoundException, AccessDeniedException, ServerException, IntegrityException) as e:
                return { data_key: None, 'message': e.message, 'status_code': e.status_code }
        return wrapper
    return decorator