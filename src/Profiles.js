import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
// import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardMedia, IconButton, Button } from '@material-ui/core';
import Language from '@material-ui/icons/Language';
import Phone from '@material-ui/icons/Phone';
import EmailOutlined from '@material-ui/icons/EmailOutlined';
import FavouriteB from '@material-ui/icons/FavoriteBorderOutlined';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Favourite from '@material-ui/icons/Favorite';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class Profile extends Component {
    constructor(props){
        super(props);
        console.log(this.props.user);
        
        this.state= {
            profile: [{...this.props.user}],
            open: false
            
        }
        console.log(this.state.profile[0].name);
        
    }
    handleClose = () => {
        let modalClose = this.state.open;
        this.setState({open:!modalClose});
    }
    handleEdit = () => {
        let modalOpen = this.state.open;
        // console.log(id);
        this.setState({open:!modalOpen});
    }

    delete = () => {
        console.log(this.props.user);
        
        this.props.delete(this.props.user.id);
    }
    like = () => {
        this.props.like(this.props.user.id);

    }
    update = () => {

        this.props.update(this.props.id)
    }
    handleName = (event) => {  
        let profileN = [...this.state.profile];
        profileN[0].name = event.target.value;
        this.setState({profile:[...profileN]});
        console.log(this.props.user.name);
        
       
    }
    handleEmail = (event)=>{
        let user = this.state.profile[0];
        // console.log(user);
        user.email = event.target.value;
        let profileN = [...this.state.profile];
        profileN.splice(0,1,user);
        this.setState({profile:profileN});
    }
    handleWeb = (event) => {
        let user = this.state.profile[0];
        // console.log(user);
        user.website = event.target.value;
        let profileN = [...this.state.profile];
        profileN.splice(0,1,user);
        this.setState({profile:profileN});
    }
    handlePhone = (event) => {
        let user = this.state.profile[0];
        // console.log(user);
        user.phone = event.target.value;
        let profileN = [...this.state.profile];
        profileN.splice(0,1,user);
        this.setState({profile:profileN});
    }
    update= () => {
        this.props.update(this.state.profile[0]);
    }
    render(){
        return (
            <Grid  item md={4} sm={6} lg={3} xl={6} >
                                    <Card style={{maxWidth:300}}>
                                        <CardMedia 
                                            style={{height:200,background:'#f5f5f5', textAlign:'center'}}
                                            
                                        >
                                        <img src={this.props.imageUrl} alt="profile" style={{width:200,height:200}}/>
                                        </CardMedia>    
                                        <CardContent>
                                            <Typography variant='subtitle1'>
                                                {this.props.user.name}
                                            </Typography>
                                            
                                                <Grid container direction="row" style={{color :'rgba(0,0,0,0.5)'}}>
                                                    
                                                    <EmailOutlined style={{width:20, height:20, marginRight:10}} />
                                                    <Typography variant="body2">{this.props.user.email}</Typography>
                                                                                
                                                </Grid>
                                                <Grid container direction="row" style={{color :'rgba(0,0,0,0.5)',marginBottom:10, marginTop:10}} >
                                                    
                                                    <Phone style={{width:20, height:20, marginRight:10}} />
                                                    <Typography variant="body2">{this.props.user.phone}</Typography>
                                                                                
                                                </Grid>
                                                <Grid container direction="row" style={{color :'rgba(0,0,0,0.5)'}}>
                                                    
                                                    <Language style={{width:20, height:20, marginRight:10}} />
                                                    <Typography variant="body2">{this.props.user.website}</Typography>
                                                                                
                                                </Grid>
                                            
                                        </CardContent>
                                        <CardActions>
                                            <Grid container justify="space-around" >
                                            <IconButton onClick={this.like}>
                                                {this.props.likeStatus?<Favourite style={{color:"red"}} />:<FavouriteB style={{color:"red"}}/>}
                                            
                                            </IconButton>
                                            <IconButton onClick={this.handleEdit}>
                                            <Edit/>
                                            </IconButton>
                                            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title"

                                                BackdropProps ={{
                                                    style : {
                                                        background:'transparent',                                                        
                                                        boxShadow:'none'
                                                        
                                                    }
                                                }}
                                                PaperProps={{
                                                    style:{
                                                        
                                                        boxShadow:'none'
                                                    }
                                                }}
                                            >
                                                <DialogTitle id="form-dialog-title">Edit Personal Details</DialogTitle>
                                                <DialogContent>
                                                    <TextField
                                                        autoFocus
                                                        margin="dense"
                                                        id="username"
                                                        label="Username"
                                                        type="text"
                                                        fullWidth
                                                        required
                                                        value={this.state.profile[0].name}
                                                        onChange={this.handleName}
                                                    />
                                                    <TextField
                                                        margin="dense"
                                                        id="email"
                                                        label="Email"
                                                        type="email"
                                                        fullWidth
                                                        required
                                                        value={this.props.user.email}
                                                        onChange = {this.handleEmail}
                                                    />
                                                    <TextField
                                                        margin="dense"
                                                        id="website"
                                                        label="Website"
                                                        type="url"
                                                        fullWidth
                                                        required
                                                        value={this.props.user.website}
                                                        onChange= {this.handleWeb}
                                                    />
                                                    <TextField
                                                        required
                                                        margin="dense"
                                                        id="phone"
                                                        label="Phone"
                                                        type="text"
                                                        fullWidth
                                                        value={this.props.user.phone}
                                                        onChange = {this.handlePhone}
                                                    />
                                                </DialogContent>
                                                
                                                <DialogActions>
                                                    <Button color="primary" onClick={this.update}>Update</Button>
                                                    <Button color="primary" onClick={this.handleClose}>Close</Button>
                                                </DialogActions>
                                            </Dialog>
                                            <IconButton onClick={this.delete}>
                                            <Delete/>
                                            </IconButton>
                                            </Grid>
                                            
                                        </CardActions>
                                    </Card>
                                    
                                    
                                </Grid>
        );
    }


}








class Profiles extends Component {

    constructor(props){
        super(props);

        this.state = {
            profiles:[],
            images:[],
            liked:[],
            open:false
        }

    }
    //Fetching data 

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then( results => {
            return results.json();
        }).then(data => {
            let x = [...data];
            this.setState({profiles: x});
            let imageUrl = [];
            imageUrl = x.map((profPic) => {
                console.log(profPic);
                let url = 'https://avatars.dicebear.com/v2/avataaars/{{'+profPic.username+'}}.svg?options[mood][]=happy';
                
                return url;
            });
            let likeStatus = [];
            likeStatus = x.map((profPic)=>{return false});
            this.setState({images: imageUrl,liked:likeStatus});
        });

        
    }
    handleLike = (id) => {
        let Profile = [...this.state.profiles];
        let likeStatus = [...this.state.liked];
        let index  = Profile.findIndex((e) => {
            return e.id === id
        });
        likeStatus.splice(index,1,!likeStatus[index]);

        // console.log(likeStatus);
        this.setState({liked:likeStatus});
        

        

    }
    
   
   
    handleDelete = (id) => {
        let Profile = [...this.state.profiles];
        let liked = [...this.state.liked];
        let imageUrl = [...this.state.images];
        let index = Profile.findIndex((e)=>{
            return e.id === id;
        });
        Profile.splice(index,1);
        liked.splice(index,1);
        imageUrl.splice(index,1);
        this.setState({profiles:Profile,images:imageUrl,liked:liked});
    }
    handleUpdate = (profile) => {
        
        console.log(profile);



        
         let profileDetails = [...this.state.profiles];
        // console.log(profileDetails);
        
         let index = profileDetails.findIndex((profileDetail)=>{
        //     //   console.log(profileDetail.id)
            return profileDetail.id === profile.id;
        })
        profileDetails.splice(index,1,profile);
        this.setState({profiles:profileDetails});
        
    }
    

    //Rendering profiles
    render(){

        
        return (
            <Grid container spacing= {3} justify="flex-start" alignItems="center" > 
                    {
                    this.state.profiles.map((profile,index) => {
                        return (
                                    
                            <Profile key={profile.id} user = {profile} imageUrl = {this.state.images[index]} likeStatus ={this.state.liked[index]} update={this.handleUpdate} delete={this.handleDelete} like = {this.handleLike}
                                
                            />
                                    
                                    
                                
                                
                            
                        )
                       
                    })
                }
            </Grid>
            
                
            
        );
    }
}

export default Profiles;