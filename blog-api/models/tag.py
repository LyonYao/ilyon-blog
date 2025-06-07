from . import db

class Tag(db.Model):
    """Tag model for storing blog tags."""
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True, nullable=False)
    
    def to_dict(self):
        """Convert tag object to dictionary."""
        return {
            'id': self.id,
            'name': self.name
        }