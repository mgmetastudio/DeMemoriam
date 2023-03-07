from rest_framework import permissions


class IsOwnerOrAuthenticatedReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user and request.user.is_authenticated:
            if request.method in permissions.SAFE_METHODS:
                return True
            
            return getattr(obj, "owner", None) == request.user
        return False