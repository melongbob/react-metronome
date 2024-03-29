import React, { Component } from 'react'
import './Metronome.css'

import click1 from './click1.wav';
import click2 from './click2.wav';

class Metronome extends Component {
	constructor(props) {
		super(props);

		this.state={
			playing: false,
			count: 0,
			bpm: 100,
			beatsPerMeasure: 4
		};

		this.click1 = new Audio(click1);
		this.click2 = new Audio(click2);

	}

	playClick = () => {
		const { count, beatsPerMeasure } = this.state;

		// The first beat will be a distinct click sound
		if (count % beatsPerMeasure === 0){
			this.click2.play();
		}
		else{
			this.click1.play();
		}
		
		this.setState(state => ({
			count: (state.count + 1) % state.beatsPerMeasure
		}));
	};	
	
	startStop = () => {
		if(this.state.playing){
			//stop the timer
			clearInterval(this.timer);
			this.setState({
				playing: false
			});
		}
		else{
			//start a tiemr with the current BPM
			this.timer = setInterval(
				this.playClick,
				(60 / this.state.bpm) * 1000);
			this.setState({
					count: 0,
					playing: true
					// Play a click "immediately" (after setState finishes)
				},
				this.playClick
			);
		}
	};

	handleBpmChange = event => {
		const bpm = event.target.value;
		if (this.state.playing){
			//Stop the old timer and start a new one
			clearInterval(this.timer);
			this.timer = setInterval(this.playclick, (60 / bpm) * 1000);

			//Set the new BPM, and reset the beat counter
			this.setState({
				count:0,
				bpm
			});
		}
		else{
			this.setState({ bpm });
		}
	};

	render(){
		const { playing, bpm } = this.state;

		return (
			<div className="metronome">
				<div className="bpm-slider">
					<div>{bpm} BPM</div>
					<input 
						type="range" 
						min="60" 
						max="240" 
						value={bpm}
						onChange={this.handleBpmChange} />
				</div>
				<button onClick={this.startStop}> {playing ? 'Stop' : 'Start'} </button>
			</div>
		);
	}
}

export default Metronome;
