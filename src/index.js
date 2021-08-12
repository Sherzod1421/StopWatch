import React from "react";
import ReactDOM from "react-dom";

class StopWatch extends React.Component {
  state = {
    second: 0,
    minute: 0,
    hour: 0,
    startDisabled: false,
    interval: "",
    savedIntervals: [],
  };

  onStartClicked = () => {
    this.setState({
      startDisabled: true,
    });
    let i = setInterval(() => {
      const { second, minute, hour } = this.state;
      if (second === 59) {
        if (minute === 59) {
          if (hour === 24) {
            this.setState({
              hour: 0,
              second: 0,
              minute: 0,
            });
          }
          this.setState({
            second: 0,
            minute: 0,
            hour: hour + 1,
          });
        } else {
          this.setState({
            second: 0,
            minute: minute + 1,
          });
        }
      } else {
        this.setState({
          second: second + 1,
        });
      }
    }, 1000);
    this.setState({
      interval: i,
    });
  };
  onStopClicked = () => {
    clearInterval(this.state.interval);
    this.setState({
      startDisabled: false,
    });
  };
  onIntervalClicked = () => {
    console.log("hello");
    const { savedIntervals } = this.state;
    savedIntervals.push({
      second: this.state.second,
      minute: this.state.minute,
      hour: this.state.hour,
    });
    this.setState({
      savedIntervals,
    });
  };

  onClearClicked = () => {
    this.setState({
      second: 0,
      minute: 0,
      hour: 0,
      savedIntervals: [],
    });
    this.onStopClicked();
  };

  render() {
    const {
      second,
      hour,
      minute,
      startDisabled,
      savedIntervals,
      timerHour,
      timerMinutes,
      timerSecond,
      timerDisabledHour,
    } = this.state;

    return (
      <div>
        <div className="container">
          <div className="row mt-4">
            <div className="col-md-6 offset-3 mt-10">
              <div className="card">
                <div className="card-header">
                  <h1>StopWatch</h1>
                </div>
                <div className="card-body">
                  <h3 className="text-center">
                    {hour}:{minute}:{second}
                  </h3>
                </div>
                <div className="card-footer">
                  <div className="row">
                    <div className="col-md-3">
                      <button
                        className="btn btn-success"
                        onClick={this.onStartClicked}
                        disabled={startDisabled}
                      >
                        Start
                      </button>
                    </div>
                    <div className="col-md-3">
                      <button
                        className="btn btn-warning"
                        onClick={this.onStopClicked}
                      >
                        Stop
                      </button>
                    </div>
                    <div className="col-md-3">
                      <button
                        className="btn btn-info"
                        onClick={this.onIntervalClicked}
                        disabled={!startDisabled}
                      >
                        Interval
                      </button>
                    </div>
                    <div className="col-md-3">
                      <button
                        className="btn btn-danger"
                        onClick={this.onClearClicked}
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  {savedIntervals.map((item, index) => (
                    <p key={index}>
                      {item.hour}:{item.minute}:{item.second}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<StopWatch />, document.getElementById("root"));
