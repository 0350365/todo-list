from flask import Flask, request, g
import sqlite3

app = Flask(__name__)

@app.before_request
def db_setup():
    con = sqlite3.connect('todo.db')
    c = con.cursor()
    g.con = con
    g.c = c

@app.teardown_request
def db_close(excep):
    g.con.close()

@app.route('/api/tasks', methods=['GET', 'POST'])
def api():
    if request.method == 'GET':
        tasks = [{'id':t[0],'name': t[1], 'completed': False if t[2] == 0 else True} for t in g.c.execute('SELECT rowid, * FROM tasks')]
        g.con.close()
        return {'taskList' : tasks}
    else:
        try:
            new_task_name = request.get_json()['name']
            g.c.execute('INSERT INTO tasks VALUES (?,?)',(new_task_name, 0))
            g.con.commit()
            g.c.execute('SELECT rowid, * FROM tasks ORDER BY rowid DESC LIMIT 1')
            new_task = g.c.fetchone()
            return {'id':new_task[0]}
        except:
            print('Error')
            return 'Server Error'

@app.route('/api/tasks/<int:id>',methods=['DELETE'])
def delete(id):
    g.c.execute("DELETE FROM tasks WHERE rowid = ?", [id])
    g.con.commit()
    return f"Delete {id}"

@app.route('/api/update/<int:id>',methods=['PUT'])
def toggle_completion(id):
    g.c.execute("UPDATE tasks SET completed = (1 - completed) WHERE rowid = ?", [id])
    g.con.commit()
    return f"Update {id}"

@app.route('/api/update/<int:id>/<string:new_name>',methods=['PUT'])
def rename(id,new_name):
    g.c.execute("UPDATE tasks SET name = ? WHERE rowid = ?", [new_name,id])
    g.con.commit()
    return new_name


if __name__ == '__main__':
    app.run(debug=True)
