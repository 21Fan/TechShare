import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from "@material-ui/core/styles/withStyles";
import axios from "axios";
import BlogCard from "./HomeBlogCard";
import Grid from "@material-ui/core/Grid";

const useStyles = theme => ({
    paper: {
        padding: '6px',
    },
    time:{
        width: '20px',
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
});
class CustomizedTimeline extends React.Component{
// export default function CustomizedTimeline() {
//     const classes = useStyles();
    constructor(props) {
        super(props);
        this.state = {
            blogId:this.props.blogId,
            commentData:[],
        };

    }


    componentDidMount(){
        this.getCommentByBlogId();

    }
    getCommentByBlogId(){
        console.log(this.state.blogId)
        axios.get('/comment?blogId='+this.state.blogId
            ,{


            })
            .then((body) => {
                console.log(body.data.data)
                this.setState({
                    commentData:body.data.data
                })
            })
    }

    render() {
        let list=this.state.commentData
        const {classes} = this.props;
        return (
            <Timeline align="left">
                {list.map((comment) => (
                    <TimelineItem align="alternate">
                        <Grid xs={12} sm={1}>
                            <TimelineOppositeContent className={classes.time}>
                                <Typography variant="body2" color="textSecondary">
                                    {comment.created}
                                </Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot>
                                    {/*<FastfoodIcon/>*/}
                                </TimelineDot>
                                <TimelineConnector/>
                            </TimelineSeparator>
                        </Grid>
                        <Grid xs={12} sm={10}>

                            <TimelineContent >
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography variant="h6" component="h1">
                                        {comment.userId}
                                    </Typography>
                                    <Typography>{comment.content}</Typography>
                                </Paper>
                            </TimelineContent>
                        </Grid>

                    </TimelineItem>
                ))}
                {/*<TimelineItem>*/}
                {/*    */}
                {/*    <TimelineOppositeContent>*/}
                {/*        <Typography variant="body2" color="textSecondary">*/}
                {/*            9:30 am*/}
                {/*        </Typography>*/}
                {/*    </TimelineOppositeContent>*/}
                {/*    <TimelineSeparator>*/}
                {/*        <TimelineDot>*/}
                {/*            <FastfoodIcon/>*/}
                {/*        </TimelineDot>*/}
                {/*        <TimelineConnector/>*/}
                {/*    </TimelineSeparator>*/}
                {/*    <TimelineContent>*/}
                {/*        <Paper elevation={3} className={classes.paper}>*/}
                {/*            <Typography variant="h6" component="h1">*/}
                {/*                Eat*/}
                {/*            </Typography>*/}
                {/*            <Typography>Because you need strength</Typography>*/}
                {/*        </Paper>*/}
                {/*    </TimelineContent>*/}
                {/*</TimelineItem>*/}
                {/*<TimelineItem>*/}
                {/*    <TimelineOppositeContent>*/}
                {/*        <Typography variant="body2" color="textSecondary">*/}
                {/*            10:00 am*/}
                {/*        </Typography>*/}
                {/*    </TimelineOppositeContent>*/}
                {/*    <TimelineSeparator>*/}
                {/*        <TimelineDot color="primary">*/}
                {/*            <LaptopMacIcon/>*/}
                {/*        </TimelineDot>*/}
                {/*        <TimelineConnector/>*/}
                {/*    </TimelineSeparator>*/}
                {/*    <TimelineContent>*/}
                {/*        <Paper elevation={3} className={classes.paper}>*/}
                {/*            <Typography variant="h6" component="h1">*/}
                {/*                Code*/}
                {/*            </Typography>*/}
                {/*            <Typography>Because it&apos;s awesome!</Typography>*/}
                {/*        </Paper>*/}
                {/*    </TimelineContent>*/}
                {/*</TimelineItem>*/}
                {/*<TimelineItem>*/}
                {/*    <TimelineSeparator>*/}
                {/*        <TimelineDot color="primary" variant="outlined">*/}
                {/*            <HotelIcon/>*/}
                {/*        </TimelineDot>*/}
                {/*        <TimelineConnector className={classes.secondaryTail}/>*/}
                {/*    </TimelineSeparator>*/}
                {/*    <TimelineContent>*/}
                {/*        <Paper elevation={3} className={classes.paper}>*/}
                {/*            <Typography variant="h6" component="h1">*/}
                {/*                Sleep*/}
                {/*            </Typography>*/}
                {/*            <Typography>Because you need rest</Typography>*/}
                {/*        </Paper>*/}
                {/*    </TimelineContent>*/}
                {/*</TimelineItem>*/}
                {/*<TimelineItem>*/}
                {/*    <TimelineSeparator>*/}
                {/*        <TimelineDot color="secondary">*/}
                {/*            <RepeatIcon/>*/}
                {/*        </TimelineDot>*/}
                {/*    </TimelineSeparator>*/}
                {/*    <TimelineContent>*/}
                {/*        <Paper elevation={3} className={classes.paper}>*/}
                {/*            <Typography variant="h6" component="h1">*/}
                {/*                Repeat*/}
                {/*            </Typography>*/}
                {/*            <Typography>Because this is the life you love!</Typography>*/}
                {/*        </Paper>*/}
                {/*    </TimelineContent>*/}
                {/*</TimelineItem>*/}
            </Timeline >
        );
    }
}
export default withStyles(useStyles)(CustomizedTimeline);
