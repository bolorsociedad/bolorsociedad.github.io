function addProgress() {
	r = Math.floor(Math.random() * 0.4);
	setTimeout(function() {
		$("#progresser").css("width", this.load + "%");
		this.load += Math.floor(Math.random() * 3 + 1);
		addProgress();
	}, r);
}

function Progresser() {
	this.load = 0;
	this.t = 0;
	step = 125;
	this.started = 0;
	this.check = function() {
		return this.load > 0;
	}

	this.addProgress = function() {
			this.t += 1;
			$("#progresser").css("width", this.load + "%");
			if (this.t % step == 0) {
				this.load += Math.floor(Math.random()*6.5);
				if (this.load >= 100) {
					this.load = 100;
				}
				this.t = 0;
			}
	}

	this.start = function() {
		clearInterval(this.timer);
		this.load = 0;
		this.t = 0;
		if (this.started == 0) {
		$("body").append('<div id="progresser"></div><div id="circle"></div>');
		}
		this.started = 1;
		$("#progresser").fadeIn();
		this.timer = setInterval(function() {
			Progresser.addProgress();
		}, 0.002);
	};

	this.set = function(n) {
		if (this.check()) {
		this.load = n*100;
		}
	}

	this.inc = function(n) {
		if (this.check()) {
		this.load += 10;
		}
	}

	this.done = function() {
		if (this.check()) {
		this.load = 100;
		$("#progresser").css("width", this.load + "%");
		setTimeout(function() {
			$("#progresser").fadeOut();
			$("#circle").fadeOut();
			this.load = 0;
			$("#progresser").css("width", "0%");

		}, 1200);
		}
	}



}