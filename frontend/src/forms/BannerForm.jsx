import SelectAsync from '@/components/SelectAsync';
import { Form, Input } from 'antd';

export default function BannerForm({ isUpdateForm = false }) {
  return (
    <>
      <Form.Item
        label="Banner Name"
        name="Banner Name"
        rules={[
          {
            required: true,
            message: 'Please input your Banner Name!',
          },
        ]}
      >
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item
        label="Size"
        name="Size"
        rules={[
          {
            required: true,
            message: 'Please type size!',
          },
        ]}
      >
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item
        label="E-mail"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
          },
        ]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      {!isUpdateForm && (
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input.Password autoComplete="new-password" />
        </Form.Item>
      )}
      <Form.Item
        label="Role"
        name="role"
        rules={[
          {
            required: true,
            message: 'This Field is required',
          },
        ]}
      >
        <SelectAsync entity={'role'} displayLabels={['displayName']}></SelectAsync>
      </Form.Item>
    </>
  );
}
