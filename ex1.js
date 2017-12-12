mySettings1 = {
	width : 380,
	height : 380,
	data : {
		"model" : [ {
			label : "Column A"
		}, {
			label : "Column B"
		}, {
			label : "Column C"
		}, ],
		"strata" : [ [ {
			initValue : 100,
			label : "Strata 1 col A"
		} ], [ {
			initValue : 20,
			label : "Strata 1 col B"
		} ], [ {
			initValue : 175,
			label : "Strata 2 col C"
		} ] ],
		stream : {
			provider : 'generator',
			refresh : 2000 / 4
		},
	},
	sedimentation : {
		token : {
			size : {
				original : 6,
				minimum : 2
			}
		},
		aggregation : {
			height : 200
		},
		suspension : {
			decay : {
				power : 1.02
			}
		}
	},
	options : {
		layout : false
	},
	chart : {}
}

var barChart = $("#ex1").vs(mySettings1).data('visualSedimentation');