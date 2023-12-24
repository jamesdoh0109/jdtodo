class BadRequestException(Exception):
    def __init__(self, message, status_code=400):
        self.message = message
        self.status_code = status_code
        super().__init__(message)

class UnauthorizedException(Exception):
    def __init__(self, message='Invalid credentials', status_code=401):
        self.message = message
        self.status_code = status_code
        super().__init__(message)

class AccessDeniedException(Exception):
    def __init__(self, message, status_code=403):
        self.message = message
        self.status_code = status_code
        super().__init__(message)

class NotFoundException(Exception):
    def __init__(self, message, status_code=404):
        self.message = message
        self.status_code = status_code
        super().__init__(message)

class IntegrityException(Exception):
    def __init__(self, message, status_code=409):
        self.message = message
        self.status_code = status_code
        super().__init__(message)

class ServerException(Exception):
    def __init__(self, message='Server error: please try again', status_code=500):
        self.message = message
        self.status_code = status_code
        super().__init__(message)
