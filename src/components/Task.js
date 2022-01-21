import { useState } from "react";
import { Button, Typography, Checkbox, Form, Input } from "antd";
import { EnterOutlined } from "@ant-design/icons";
const { Text } = Typography;

function Task({ task, toggleTasks, deleteTask, editName }) {
  const [isNameChange, setIsNameChange] = useState(false);

  const validateNewName = (name) => {
    editName(name.newTaskName, task.id);
    setIsNameChange(false);
  };

  return (
    <div className="task" style={{ width: "100%" }}>
      <div style={{ display: "flex", height: "3.5rem" }}>
        {/* Toggles whether the task is completed or not */}
        <Checkbox checked={task.completed} onChange={() => toggleTasks(task.id)} />
        <Form onFinish={validateNewName}>
          {isNameChange ? (
            <Form.Item
              name="newTaskName"
              rules={[{ required: true, message: "New name is invalid", whitespace: true }]}
              initialValue={task.name}
              wrapperCol={{ offset: 1, span: 20 }}
            >
              <Input suffix={<EnterOutlined />} />
            </Form.Item>
          ) : (
            <Text style={{ marginBottom: "0", marginLeft: "1rem", height: "2rem" }}>
              {task.name}
            </Text>
          )}
        </Form>
      </div>
      <div className="taskEditBtns">
        <Button onClick={() => setIsNameChange(!isNameChange)}> Edit </Button>
        <Button
          style={{ background: "#ff4d4f", color: "white" }}
          onClick={() => deleteTask(task.id)}
        >
          {" "}
          Delete{" "}
        </Button>
      </div>
    </div>
  );
}

export default Task;
