import React from "react";

const NotFound = () => {
  return (
    <div className="not_found">
      <section className="page_404">
        <div>
          <div className="row">
            <div className="col-sm-12 ">
              <div
                className="col-sm-10 col-sm-offset-1"
                style={{
                  textAlign: "center",
                }}
              >
                <div className="four_zero_four_bg">
                  <h1>
                    4<span>0</span>4
                  </h1>
                </div>

                <div className="contant_box_404">
                  <h3 style={{ fontSize: "2rem" }}>Look like you're lost</h3>

                  <p>the page you are looking for is not avaible!</p>

                  <a href="/dashboard" className="link_404">
                    Go to Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
