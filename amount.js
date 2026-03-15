class Amount extends AudioWorkletProcessor {

	static get parameterDescriptors() {
		return [
			{
				name: "amount",
				defaultValue: 0.0,
				minValue: -1.0,
				maxValue: 1.0,
				automationRate: "k-rate",
			}
		];
	}
	
	process(inputs, outputs, parameters) {
		const amount = parameters["amount"][0];

		const output = outputs[0][0];
		for ( let i=0; i< output.length; i++ ) {
			output[i] = amount;
		}
		return true;
	}
}

registerProcessor("amount", Amount);
