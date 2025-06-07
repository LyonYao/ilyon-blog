from . import db

class Category(db.Model):
    """Category model for storing blog categories."""
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True, nullable=False)
    
    def to_dict(self):
        """Convert category object to dictionary."""
        return {
            'id': self.id,
            'name': self.name
        }