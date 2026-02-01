"""Error Handlers"""

def register_error_handlers(app):
    """Register error handlers for the application"""
    
    @app.errorhandler(404)
    def not_found(error):
        return {'success': False, 'message': 'Resource not found'}, 404
    
    @app.errorhandler(500)
    def internal_error(error):
        return {'success': False, 'message': 'Internal server error'}, 500
    
    @app.errorhandler(403)
    def forbidden(error):
        return {'success': False, 'message': 'Forbidden'}, 403
    
    @app.errorhandler(401)
    def unauthorized(error):
        return {'success': False, 'message': 'Unauthorized'}, 401
