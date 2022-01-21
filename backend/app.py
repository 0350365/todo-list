from unicodedata import name
from flask import Flask, make_response, request, g
from flask_sqlalchemy import SQLAlchemy
import sqlite3

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todo.db'

db = SQLAlchemy(app)

# Model
class tasks(db.Model):
    rowid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    completed = db.Column(db.Integer)

    def get_as_dict(self):
        return {'id': self.rowid, 'name':self.name, 'completed':self.completed}

# Get all tasks / add new task
@app.route('/api/tasks', methods=['GET', 'POST'])
def add_get_tasks():
    if request.method == 'GET':
        task_list = tasks.query.all()
        return {'taskList' : [t.get_as_dict() for t in task_list]}
    else:
        new_task_name = request.get_json()['name']
        new_task = tasks(name = new_task_name, completed = 0)
        db.session.add(new_task)
        db.session.commit()
        return {'id':new_task.get_as_dict()['id']}
 
# Delete tasks
@app.route('/api/tasks/<int:id>',methods=['DELETE'])
def delete_task(id):
    tasks.query.filter_by(rowid=id).delete()
    db.session.commit()
    return {'deleted': id}

# Rename task / toggle task completeness
@app.route('/api/update/<int:id>',methods=['PUT'])
def rename_toggle_task(id):
    task_to_modify = tasks.query.filter_by(rowid=id).first()
    if request.get_json() is not None:   
        task_to_modify.name = request.get_json()['name']
        db.session.commit()
        return {'renamed_id': id, 'new_name':task_to_modify.name}
    else:
        task_to_modify.completed = 1 - task_to_modify.completed
        db.session.commit()
        return {'completeness_toggled':id, 'new_state':task_to_modify.completed}


if __name__ == '__main__':
    app.run(debug=True)
