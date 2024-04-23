import { useParams } from "react-router-dom";
import Header from "../../components/job/Header";
import Sidebar from "../../components/job/Sidebar";
import { useContext, useEffect, useState } from "react";
import { Context as JobsContext } from "../../context/JobsContext";
import { Context as AuthContext } from "../../context/AuthContext";
import Loader from "../../components/Loader";
import RelatedJobs from "../../components/job/RelatedJobs";
import "../../styles/JobDescription.scss";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const JobDescription = () => {

  const [pageStatus, setPageStatus] = useState("page-loading");
  const { job } = useParams();
  const { height, width } = useWindowDimensions();

  const {
    state: { single_job, related_jobs },
    getJob,
  } = useContext(JobsContext);

  const {
    state: { token },
  } = useContext(AuthContext);

  useEffect(() => {
    getJob(job, (status) => { setPageStatus(status); });
  }, [job, token]);

  return pageStatus == 'page-loading' ? (
    <Loader />
  ) : (
    <>
      {pageStatus == 'job-not-found' ? (<>
        <div class="loader" style={{ height: '100vh' }}><b>Job not found, either the slug is changed or the job has been closed.</b></div>
      </>) : (<>
        <div className="profile-header">
          <Header data={single_job} />
        </div>
        <div className="profile-content mt-5 mb-5">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="content-section">
                  <h1 className="content-title mt-0">Job Description</h1>
                  {single_job.description.split("\n\n").map((line) => (
                    <p dangerouslySetInnerHTML={{ __html: line }}></p>
                  ))}
                  {/* <h5 className="subtitle">About the job:</h5>
                <p className="content">
                  Bakery Austin is currently seeking a proven, energetic, and
                  inspired Senior Art Director with the drive to create
                  memorable, award-winning, fearless concepts for our clients
                  while leading the visual design and execution of all online
                  and offline campaign elements. Working alongside a Senior
                  Copywriter, the right candidate will conceive and execute
                  high-level creative work consistent with the agreed-upon
                  strategy. This team will also be required to present concepts
                  vividly, then work alongside filmmakers, editors, animators,
                  designers and illustrators to bring about their vision.
                </p>
                <h5 className="subtitle">About Us:</h5>
                <p className="content">
                  Bakery is an independent creative and culture agency designed
                  to ignite people’s obsession in great products. From our
                  headquarters in Austin, TX, we work with highly ambitious
                  brands like Johnnie Walker, Nike, Shiner Beer and DeLorean
                  Motors to infuse cultural value and drive desire at every
                  interaction, increasing their fame and helping them make
                  things people want. Bakery is a 2022 AdAge Small Agency of the
                  Year.
                </p>
                <h5 className="subtitle">Responsibilities:</h5>
                <p className="content">
                  <ul>
                    <li>Develop brave, smart ideas that are on strategy</li>
                    <li>
                      Work with a partner that elevates your work while you
                      elevate theirs
                    </li>
                    <li>
                      Participate in client and internal creative review
                      meetings, with the ability to receive and process feedback
                      and offer solutions in real-time
                    </li>
                    <li>
                      Expertly present your work internally and to clients
                      employing beautiful art renders on an editorial-quality
                      slide deck
                    </li>
                    <li>
                      Lead design of a variety of creative materials for brand
                      campaigns, social media efforts, and digital efforts
                    </li>
                    <li>
                      Be a role model and advocate for collaboration across the
                      company
                    </li>
                    <li>
                      Provide ongoing thought leadership internally across the
                      agency and externally with clients
                    </li>
                    <li>
                      Have a focused eye for innovation, informing the company
                      of the next biggest thing that can positively affect our
                      client’s business
                    </li>
                  </ul>
                </p>
                <h5 className="subtitle">Requirements:</h5>
                <p className="content">
                  <ul>
                    <li>
                      Applicants must be legally able to work on-site in Austin,
                      TX. We cannot sponsor work visas for this role at this
                      time
                    </li>
                    <li>
                      5+ years of experience working in a market-leading agency
                      environment in an Art Direction role
                    </li>
                    <li>
                      Impressive online portfolio of work demonstrating a proven
                      track record of conceptual creative ability and judgment
                      showcased across a variety of projects—namely in film,
                      social, and web content—for top-tier clients
                    </li>
                    <li>
                      Ability to collaborate with anyone; we’re not looking for
                      “superstars” or people whose ego gets in the way of
                      creative development. We need empathetic leaders who teach
                      by example
                    </li>
                    <li>Expert at campaign development and execution</li>
                    <li>
                      A confident but respectful nature—not afraid to suggest
                      new ideas or resistant to accepting them
                    </li>
                    <li>
                      Skilled at negotiating and incorporating client input into
                      ongoing projects
                    </li>
                    <li>
                      Strong understanding of what a good creative brief is and
                      when to push back / request revisions
                    </li>
                    <li>
                      Knowledgeable about marketing plans, including objectives,
                      business strategies, and success measurements
                    </li>
                    <li>
                      Understand client product and business challenges in
                      relation to overall market
                    </li>
                    <li>Senior-level client presentation ability</li>
                    <li>Excellent oral and written skills</li>
                  </ul>
                </p>
                <h5 className="subtitle">Benefits:</h5>
                <p className="content">
                  <ul>
                    <li>Medical, Dental, and Vision insurance</li>
                    <li>Unlimited Vacation Time</li>
                    <li>2 weeks Work From Anywhere (WFA)</li>
                    <li>Annual Retreats</li>
                    <li>Pet-Friendly Office</li>
                    <li>Yearly Creative Stipend</li>
                    <li>Summer Movies @ Alamo Drafthouse</li>
                    <li>Snacks, Meals and Drinks</li>
                    <li>No Time Tracking!</li>
                  </ul>
                </p> */}
                  {width > 767 && (
                    <RelatedJobs data={related_jobs} />
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="profile-sidebar">
                  <Sidebar data={single_job} />
                </div>
              </div>
              {width <= 767 && (
                <RelatedJobs data={related_jobs} />
              )}
            </div>
          </div>
        </div>
      </>)}
    </>
  );
};

export default JobDescription;
