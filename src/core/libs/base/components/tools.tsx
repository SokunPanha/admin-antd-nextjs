import {Tooltip, Typography} from 'antd'

export const CopyableCutPopover = ({content, width}: {width: number, content: string}) => {
  return (
    <Tooltip title={content}>
      <Typography.Text
        copyable
        ellipsis
        style={{cursor: 'pointer',width}}>
        {content}
      </Typography.Text>
    </Tooltip>
  )
}
