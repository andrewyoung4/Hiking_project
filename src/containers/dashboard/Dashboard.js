import React, { Component } from 'react';

import "./Dashboard.css";
class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="parent">
        <div className="container">
          <div className="my-4">
            <div className="jumbotron text-center bg-danger text-light">
              <div className="container">
                <h1>Thank you for using our app!</h1>
                <p className="lead">Find your perfect destination!</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="my-4">
            <div className="jumbotron text-center bg-cyan text-dark" id="1">
              <div className="card">
                <div class="card-body">
                  <h5 class="card-title">Wonderland Trail (10)</h5>
                  <h6 class="card-subtitle mb-2 text-muted">Mount Rainier National Park, Washington</h6>
                  <img src="https://www.backpacker.com/.image/t_share/MTQ0OTE0MTA4OTAzOTI1MzEz/mt-rainier.jpg" alt="Rainier" id="img"></img>
                  <p class="card-text">Just because this trail circumnavigates, rather than summits, 14,411-foot Mount Rainier, don’t assume it’s an easy walk in Mount Rainier National Park. Think of it this way: with a total elevation gain of 22,000 feet, it’s sort of like summitting the active volcano twice, minus the scary crevasses. Spread the hike over 10 to 14 days to fully appreciate this epic meander through the most beautiful terrain in the Pacific Northwest, from lowland forests and subalpine meadows to wide-open valleys with views of Rainier’s icy glaciers.</p>
                </div>
                <button class="btn btn-primary" type="submit" id="btn"><i class="fa fa-bookmark">Save</i></button>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="my-4">
            <div className="jumbotron text-center bg-cyan text-dark" id="2">
              <div className="card">
                <div class="card-body">
                  <h5 class="card-title">South Maroon Peak (5)</h5>
                  <h6 class="card-subtitle mb-2 text-muted">Maroon Bells, Colorado</h6>
                  <img src="https://www.outsideonline.com/sites/default/files/styles/img_850-width_flex-height/public/2019/03/15/maroon-trail-colorado1_h.jpg?itok=Wobcjiu8" alt="Maroon" id="img"></img>
                  <p class="card-text">Choosing the best of Colorado’s 59 fourteeners is a little like being forced to pick your favorite child. We love the Bells because few peaks on the planet are more impressive than the behemoth 14,163-foot South Maroon (and its 14,019-foot twin, North Maroon, a third of a mile away). The alpine views of Maroon Creek Valley and the surrounding Elk Range from the summit of South Maroon, the true fourteener of the two, are astounding. And the awe is earned: these peaks are largely composed of sedimentary mudstone and are notorious for their loose, rotten rock up high, so bring your helmet. Even the standard, Class III South Ridge Route to the summit of South Maroon requires extensive time above the tree line, scrambling up often vertical rock. It’s a worthy 4,500-foot challenge, but it would be more relaxing to stay low and stick to the 1.5-mile-long Maroon Lake Scenic Trail.</p>
                </div>
                <button class="btn btn-primary" type="submit" id="btn"><i class="fa fa-bookmark">Save</i></button>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="my-4">
            <div className="jumbotron text-center bg-cyan text-dark" id="1">
              <div className="card">
                <div class="card-body">
                  <h5 class="card-title">Chilkoot Trail (7)</h5>
                  <h6 class="card-subtitle mb-2 text-muted">Dyea, Alaska, to Bennett Lake, Canada</h6>
                  <img src="https://www.outsideonline.com/sites/default/files/styles/img_850-width_flex-height/public/2019/03/15/chikoot-trail-alaska_h.jpg?itok=P5Q_ex0S" alt="Chilkoot" id="img"></img>
                  <p class="card-text">Though it’s just a fraction of the original 600-mile trek to the Klondike, the first 33-mile section of the Chilkoot—which starts in the Alaskan ghost town of Dyea, summits 3,759-foot Chilkoot Pass, and ends at Bennett Lake, British Columbia—gives hikers a taste of the wild vistas and extreme hardships prospectors experienced during the gold fever of the late 1800s. Today the trail has a few comforts, like nine developed campsites, but there’s still rain, avalanche danger, and the looming presence of the resident black and brown bears.</p>
                </div>
                <button class="btn btn-primary" type="submit" id="btn"><i class="fa fa-bookmark">Save</i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default (DashBoard);
