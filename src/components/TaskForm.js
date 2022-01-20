import { useState } from "react";
import { Button, Input, Form } from "antd";
import TaskContainer from "./TaskContainer";

function TaskForm({ tasks, addTask, toggleTasks, deleteTask, editName }) {
  const submitTask = (task) => {
    addTask(task.newTask);
  };
  return (
    <div className="mainForm">
      What needs to be done?
      <Form
        name="addTask"
        style={{ width: "60%" }}
        onFinish={submitTask}
        initialValues={{ remember: false }}
      >
        <Form.Item
          name="newTask"
          rules={[{ required: true, message: "New name is invalid", whitespace: true }]}
        >
          <Input placeholder="Task name" />
        </Form.Item>
        <Form.Item style={{ marginBottom: "5px" }}>
          {" "}
          <Button style={{ width: "100%" }} type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
      <TaskContainer
        tasks={tasks}
        toggleTasks={toggleTasks}
        deleteTask={deleteTask}
        editName={editName}
      />
    </div>
  );
}

export default TaskForm;
