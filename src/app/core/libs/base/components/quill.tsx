// import React, {useEffect, useRef} from 'react'
// // @ts-ignore
// import Quill from 'quill'
// // @ts-ignore
// import QuillImageDropAndPaste from 'quill-image-drop-and-paste'
// import 'quill/dist/quill.snow.css'
// import {ProFormItem, ProFormItemProps} from '@ant-design/pro-form'

// Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste)

// interface QuillInputProps {
//   value?: string;
//   onChange?: (data: string) => void;
//   upload: (file: FormData) => Promise<string>;
// }

// export const QuillInput = ({value, onChange, upload}: QuillInputProps) => {
//   const ref = useRef<HTMLDivElement>(null)
//   const quillRef = useRef<Quill>()
//   const fileUpload = (file: File) => {
//     const data = new FormData()
//     data.append('file', file)
//     upload(data).then(url => {
//       const currentQuill = quillRef.current!
//       let index = (currentQuill.getSelection() || {}).index
//       if (index === undefined || index < 0) index = currentQuill.getLength()
//       currentQuill.insertEmbed(index, 'image', url, 'user')
//     })
//   }

//   useEffect(() => {
//     const quill = new Quill(ref.current!, {
//       modules: {
//         toolbar: {
//           container: [
//             ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//             [{list: 'ordered'}, {list: 'bullet'}, {indent: '-1'}, {indent: '+1'}],
//             ['link', 'image'],
//             ['clean']
//           ],
//           handlers: {
//             'image': () => {
//               const input = document.createElement('input')
//               input.setAttribute('type', 'file')
//               input.setAttribute('accept', 'image/*')
//               input.click()
//               input.onchange = () => fileUpload(input.files[0])
//             }
//           }
//         },
//         imageDropAndPaste: {
//           handler: async (imageDataUrl: string, type: string, imageData: any) => {
//             fileUpload(imageData.toFile())
//           }
//         }
//       },
//       theme: 'snow'
//     })

//     quill.on('text-change', () => {
//       onChange?.(quill?.root?.innerHTML as string)
//     })
//     quillRef.current = quill
//     quill.setContents(quill.clipboard.convert(value))
//     return () => {
//     }
//   }, [])

//   return (
//     <div ref={ref} style={{height: 300}}/>
//   )
// }

// interface FormItemQuillProps extends ProFormItemProps {
//   quillProps: QuillInputProps,
// }

// export const FormItemQuill = ({quillProps, ...props}: FormItemQuillProps) => {
//   return <ProFormItem {...props}>
//     <QuillInput {...quillProps}/>
//   </ProFormItem>
// }
