import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Button,
  Image,
} from 'react-native';
import UserContext from '../../Contexts/UserContext';
import Queue from '../../Utils/Queue';
import SwipeService from '../../services/swipe-service';

export default class Main extends Component {
  state = {queue: new Queue(), expanded: false, error: null, loading: false};
  static contextType = UserContext;

  componentDidMount() {
    console.log(typeof this.context.user_id);
    SwipeService.getPotentialMatches(this.context.user_id)
      .then(potentialMatches => {
        console.log(potentialMatches);
        const queue = new Queue();
        potentialMatches.queue.forEach(match => {
          queue.enqueue(match);
        });
        this.setState({queue});
      })
      .catch(error => this.setState({error: error.message}));
  }

  //   generateUserCard = (user) => {

  //     if (user.bio === null || user.bio === '') user.bio = 'No Bio';
  //     if (user.lfm_in === null || user.lfm_in === '') user.lfm_in = 'None';

  //     return (
  //         <>
  //             <div className='main__Swipe-User' onClick={this.toggleExpanded}>
  //                 <section className='minViewInfo'>
  //                 {this.state.expanded ? (<img src={user.avatar} alt='avatar'
  //                 className='main__Image main__hidden-img' />) :
  //                 (<img src={user.avatar} alt='avatar' className='main__Image' />)}
  //                 <h3 className='main__display-name'>{user.display_name}</h3>
  //                 </section>
  //                 <section className='main__bottom-card'>
  //                     <h4 className='main__card-header'>Platforms</h4>
  //                     <div className='main__platforms'>
  //                         {user.platforms.length === 0 ? <p className='main__none'>None</p> : null}
  //                         {user.platforms.includes("PC") ? <img className='main__PC' src={PC_Logo} alt='PC logo' /> : null}
  //                         {user.platforms.includes("Nintendo") ? <img className='main__nintendo' src={nintendoLogo} alt='Nintendo logo' /> : null}
  //                         {user.platforms.includes("Xbox") ? <img className='main__xbox' src={xboxLogo} alt='Xbox logo' /> : null}
  //                         {user.platforms.includes("PlayStation") ? <img className='main__playstation' src={playstationLogo} alt='Playstation logo' /> : null}
  //                     </div>
  //                     <h4 className='main__card-header'>LFM</h4>
  //                         {this.context.generateLfmElements(user.lfm_in)}
  //                     {this.state.expanded ? (<>
  //                         <h4 className='main__card-header'>Genres</h4>
  //                         <span className='main__genres'>{this.context.generateGenreString(user.genres)}</span>
  //                         <h4 className='main__card-header'>Bio</h4>
  //                         <p className='main__bio'>{user.bio}</p></>)
  //                         :
  //                         (<><h4 className='main__card-header main__hidden-text'>Bio</h4>
  //                         <p className='main__bio main__hidden-text'>{user.bio}</p></>)}
  //                     <div className='main__caret-container'>
  //                         <input className={`main__down-caret${this.state.expanded ? ' reverse' : ''}`} type="image" src={down_caretSVG} alt='down-caret' />
  //                     </div>
  //                 </section>
  //             </div>
  //         <div className='main__Second-Nav'>
  //             <img className='main__x' src={x_markSVG} alt='x' onClick={this.swipeLeft} />
  //             <img className='main__check' src={checkmarkSVG} alt='checkmark' onClick={this.swipeRight} />
  //         </div>
  //         </>
  //     )
  // }

  render() {
    const queue = this.state.queue;
    const userOne = queue.isEmpty() ? null : queue.peek();
    console.log(userOne);
    return (
      <>
        {this.state.error && (
          <Text style={styles.error}>{this.state.error}</Text>
        )}
        {userOne && (
          <>
            <Text style={{textAlign: 'center', marginTop: '50%'}}>
              {userOne.display_name}
            </Text>
            <Image
              source={{uri: userOne.avatar}}
              style={{width: 200, height: 200}}
            />
          </>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  error: {
    marginTop: 30,
    textAlign: 'center',
    color: 'black',
  },
});
