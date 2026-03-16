class LowPassFilter extends AudioWorkletProcessor {

	last = [0,0,0,0];

	static get parameterDescriptors() {
		return [
			{
				name: "cutoff",
				defaultValue: 1.0,
				minValue: 0.0,
				maxValue: 2.0,
				automationRate: "k-rate",
			}
		];
	}
	
	process(inputs, outputs, parameters) {
		const cutoff = parameters["cutoff"][0];
		const freq = Math.pow(2, cutoff*6) * (55/8);
		const rate = freq / ( Math.pow(2, 2*6) * (55/8) );

		const output = outputs[0][0];
		const input = inputs[0][0];
		if( input ) {
			for (let i = 0; i < output.length; i++) {
				let newVal = input[i];
				for( let o=0; o<4; o++ ) {
					let diff = newVal - this.last[o];
					this.last[o] += diff * rate;
					newVal = this.last[o];
				}
				output[i] = newVal;
			}
		} else {
			for ( let i=0; i< output.length; i++ ) {
				output[i] = 0;
			}
			for( let i=0; i<4; i++ ) {
				this.last[i] = 0;
			}
		}
		return true;
	}
}

registerProcessor("filter", LowPassFilter);
