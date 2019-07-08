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
const styles  = {
    root : {
        background : 'transparent'
    }
};
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
    handleLike = (index) => {
        let likeStatus = [...this.state.liked];
        likeStatus.splice(index,1,!likeStatus[index]);

        // console.log(likeStatus);
        this.setState({liked:likeStatus});
        

        

    }
    
    handleEdit = (id) => {
        let modalOpen = this.state.open;
        console.log(id);
        
        this.setState({open:!modalOpen});
    }
    handleClose = () => {
        let modalClose = this.state.open;
        this.setState({open:!modalClose});
    }
    handleDelete = (index) => {
        let Profile = [...this.state.profiles];
        let liked = [...this.state.liked];
        let imageUrl = [...this.state.images];
        Profile.splice(index,1);
        liked.splice(index,1);
        imageUrl.splice(index,1);
        this.setState({profiles:Profile,images:imageUrl,liked:liked});
    }
    handleUpdate = (id) => {
        console.log(id);
        
        let profileDetails = [...this.state.profiles];
        console.log(profileDetails);
        
        let profile = profileDetails.find((profileDetail)=>{
            // console.log(profileDetail.id)
            return profileDetail.id === id;
            
        })
        console.log(profile);
        
    }

    //Rendering profiles
    render(){

        
        return (
            <Grid container spacing= {3} justify="flex-start" alignItems="center" > 
                    {
                    this.state.profiles.map((profile,index) => {
                        return (
                                <Grid key={profile.id} item md={4} sm={6} lg={3} xl={6} >
                                    <Card style={{maxWidth:300}}>
                                        <CardMedia 
                                            style={{height:200,background:'#f5f5f5', textAlign:'center'}}
                                            
                                        >
                                        <img src={this.state.images[index]} alt="profile" style={{width:200,height:200}}/>
                                        </CardMedia>    
                                        <CardContent>
                                            <Typography variant='subtitle1'>
                                                {profile.username}
                                            </Typography>
                                            
                                                <Grid container direction="row" style={{color :'rgba(0,0,0,0.5)'}}>
                                                    
                                                    <EmailOutlined style={{width:20, height:20, marginRight:10}} />
                                                    <Typography variant="body2">{profile.email}</Typography>
                                                                                
                                                </Grid>
                                                <Grid container direction="row" style={{color :'rgba(0,0,0,0.5)',marginBottom:10, marginTop:10}} >
                                                    
                                                    <Phone style={{width:20, height:20, marginRight:10}} />
                                                    <Typography variant="body2">{profile.phone}</Typography>
                                                                                
                                                </Grid>
                                                <Grid container direction="row" style={{color :'rgba(0,0,0,0.5)'}}>
                                                    
                                                    <Language style={{width:20, height:20, marginRight:10}} />
                                                    <Typography variant="body2">{profile.email}</Typography>
                                                                                
                                                </Grid>
                                            
                                        </CardContent>
                                        <CardActions>
                                            <Grid container justify="space-around" >
                                            <IconButton onClick={()=>{this.handleLike(index)}}>
                                                {this.state.liked[index]?<Favourite style={{color:"red"}} />:<FavouriteB style={{color:"red"}}/>}
                                            
                                            </IconButton>
                                            <IconButton onClick={()=> this.handleEdit(profile.id)}>
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
                                                        value={profile.username}
                                                        onChange={this.handleName}
                                                    />
                                                    <TextField
                                                        margin="dense"
                                                        id="email"
                                                        label="Email"
                                                        type="email"
                                                        fullWidth
                                                        required
                                                        value={profile.email}
                                                        onChange = {this.handleEmail}
                                                    />
                                                    <TextField
                                                        margin="dense"
                                                        id="website"
                                                        label="Website"
                                                        type="url"
                                                        fullWidth
                                                        required
                                                        value={profile.website}
                                                        onChange= {this.handleWeb}
                                                    />
                                                    <TextField
                                                        required
                                                        margin="dense"
                                                        id="phone"
                                                        label="Phone"
                                                        type="text"
                                                        fullWidth
                                                        value={profile.phone}
                                                        onChange = {this.handlePhone}
                                                    />
                                                </DialogContent>
                                                
                                                <DialogActions>
                                                    <Button color="primary" onClick={()=>this.handleUpdate(profile.id)}>Update</Button>
                                                    <Button color="primary" onClick={this.handleClose}>Close</Button>
                                                </DialogActions>
                                            </Dialog>
                                            <IconButton onClick={(index) => this.handleDelete(index)}>
                                            <Delete/>
                                            </IconButton>
                                            </Grid>
                                            
                                        </CardActions>
                                    </Card>
                                    
                                    
                                </Grid>    

                                    
                                    
                                
                                
                            
                        )
                       
                    })
                }
            </Grid>
            
                
            
        );
    }
}

export default Profiles;