import React from 'react'
import Vditor from 'vditor'
//import "vditor/src/assets/scss/index.scss"
import "vditor/src/assets/scss/index.scss"
import Button from "@material-ui/core/Button";


const e = React.createElement

export default class MarkdownEditor extends React.Component {
    constructor (props) {
        super(props)
        this.state={
            vditor:Vditor,
        }
    }

    componentDidMount () {
        this.props.triggerRef(this)
        this.state.vditor = new Vditor('vditor', {
            height: 360,
            toolbarConfig: {
                pin: true,
            },
            cache: {
                enable: false,
            },
            // after () {
            //     vditor.setValue('Hello, Vditor + React!')
            // },
        })

    }
    PostMD(){
        const editorValue=this.state.vditor.getValue();
        console.log(editorValue)
    }
    // PostMarkdown(){
    //     const a=vditor.getValue()
    // }
    render () {
        return e(
            'div',
            {id: 'vditor'},

        )

    }
}