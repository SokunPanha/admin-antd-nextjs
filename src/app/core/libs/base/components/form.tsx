import React from "react"
import {type FormItemProps} from "antd/lib/form/FormItem"
import {Form} from "antd"

export const createInput = <T,>(
  Comp: React.FC<{ onChange: any; id: string; value: any } & T>
): (
  args: FormItemProps & { props?: T }
) => React.ReactElement => {
  return ({ props, ...itemProps }) => {
    return (
      <Form.Item {...itemProps}>
        {/*@ts-ignore*/}
        <Comp {...props} />
      </Form.Item>
    );
  };
};
