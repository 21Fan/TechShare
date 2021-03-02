import React from 'react'
import Vditor from 'vditor'
//import "vditor/src/assets/scss/index.scss"
import "vditor/src/assets/scss/index.scss"
import Button from "@material-ui/core/Button";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";


const e = React.createElement
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default class MarkdownEditor extends React.Component {
    constructor (props) {
        super(props)
        this.state={
            vditor:Vditor,
            open:false,
            severity:"",
            msg:"",
            data:null,

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
    PostMD(id){
        const editorValue=this.state.vditor.getValue();
        console.log(JSON.parse(localStorage.getItem("jwt")).jwt)
        fetch('http://localhost:8080/blog/edit'
            ,{
                method:'POST',
                headers:{
                    'content-type':'application/json',
                    'Authorization':JSON.parse(localStorage.getItem("jwt")).jwt
                },
                body:JSON.stringify({
                    "id":id,
                    "title":"title",
                    "description":"description",
                    "content": editorValue
                })


            })
            .then(res =>res.json())
            .then((body) => {
                console.log(body)
                this.setState({
                    open:true,
                    msg:body.msg,
                    data:body.data
                })
                if (body.code===200){
                    this.setState({
                        severity:"success"
                    })
                }
                else {
                    this.setState({
                        severity:"error",
                    })
                }
            })
        console.log(editorValue)
    }
    // PostMarkdown(){
    //     const a=vditor.getValue()
    // }

    handleClose(event, reason){
        if (reason === 'clickaway') {
            return;
        }

        this.setState({open:false})
    };
    render () {
        return(
            <div>
            <div id={'vditor'}>{null}</div>
            <Snackbar open={this.state.open} autoHideDuration={6000} onClose={()=>this.handleClose()}>
                <Alert onClose={()=>this.handleClose()} severity={this.state.severity}>
                    {this.state.msg}
                    {this.state.data}
                </Alert>
            </Snackbar>
            </div>

        )

        // e(
        //     'div',
        //     {id: 'vditor'},
        //
        // )

    }
}