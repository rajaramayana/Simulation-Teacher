
export const SYLLABUS_CONTEXT = `
Simulation and Modeling
Course Description: The syllabus consists of introduction to system, modelling and simulation of different types of systems. It includes the modelling of systems, its validation, verification and analysis of simulation output. It comprises the concept of queuing theory, random number generation as well as study of some simulation languages.
Course Objectives: To make students understand the concept of simulation and modelling of real time systems.
Course Contents:
Unit 1: Introduction to Simulation (6 Hrs.)
System and System Environment, Components of System, Discrete and Continuous System, System Simulation, Model of a System, Types of Model, Use of Differential and Partial differential equations in Modelling, Advantages, Disadvantages and Limitations of Simulation, Application Areas, Phases in Simulation Study.
Unit 2: Simulation of Continuous and Discrete System (7 Hrs.)
Continuous System Models, Discrete Event Simulation, Arrival Processes, Models of Gathering statistics, Probability and Monte Carlo Simulation.
Unit 3: Queuing System (6 Hrs.)
Characteristics and Structure of Basic Queuing System, Queuing notation, Single server and Multiple server Queuing Systems, Measurement of Queuing System Performance, Network of queuing, Applications of queuing system.
Unit 4: Markov Chains (2 Hrs.)
Features, Process Examples, Applications.
Unit 5: Random Numbers (7 Hrs.)
Random Numbers and its properties, Pseudo Random Numbers, Methods of generation of Random Number, Tests for Randomness - Uniformity and independence, Random Variate Generation.
Unit 6: Verification and Validation (4 Hrs.)
Design of Simulation Models, Verification, Validation, Calibration, Three-Step Approach for Validation, Accreditation of Models.
Unit 7: Analysis of Simulation Output (4 Hrs.)
Confidence Intervals and Hypothesis Testing, Estimation Methods, Simulation run statistics, Replication of runs, Elimination of initial bias.
Unit 8: Simulation of Computer Systems (9 Hrs.)
Simulation Tools, Simulation Languages - GPSS, Case Studies of different types of Simulation Models.
Laboratory Work: Implement different methods of random number generation, Simulating games of dice, Testing of random numbers (K-S and Chi Square Test), Implementing applications of Monte Carlo methods, Implement applications of Markov's chain, Simulation of single queue server system, GPSS models.
`;

export const SOLUTIONS_MANUAL_CONTEXT = `
Solutions Manual: DISCRETE-EVENT SYSTEM SIMULATION Fourth Edition by Jerry Banks, John S. Carson II, Barry L. Nelson, David M. Nicol

Chapter 1: Introduction to Simulation
- System: A collection of entities (e.g., people, machines) that interact together to accomplish a goal.
- State Variables: Variables that describe the state of the system at any time.
- Events: An instantaneous occurrence that may change the state of the system.
- Simulation: The imitation of the operation of a real-world process or system over time.
- Steps in a Simulation Study: 1. Problem formulation. 2. Setting of objectives. 3. Model conceptualization. 4. Data collection. 5. Model translation. 6. Verification. 7. Validation. 8. Experimental design. 9. Production runs and analysis. 10. More runs? 11. Documentation and reporting. 12. Implementation.

Chapter 2: Simulation Examples
- Queueing Systems: Characterized by customers arriving, waiting in a queue (line), being serviced, and departing. Key metrics: average waiting time, queue length, server utilization.
- Example: Single-server queue simulation table tracks arrival times, service times, time service begins/ends, time in queue, time in system, and server idle time.
- Monte Carlo Simulation: Uses random numbers to model phenomena with significant uncertainty. Used for problems that are deterministic but too complex for analytical solutions.
- Example: Profit calculation for a bakery based on random daily demand. Profit = Revenue - Cost - Lost Profit from excess demand + Revenue from salvaging leftovers.

Chapter 3 & 4: General Principles & Simulation Software
- Concepts in Discrete-Event Simulation (DES): Focuses on events and the changes they cause. A simulation clock advances from one event to the next.
- Event Scheduling/Time-Advance Algorithm: The core of a DES simulator. 1. Remove the most imminent event from the Future Event List (FEL). 2. Advance the clock to the time of this event. 3. Execute the event, updating state variables. 4. Generate new future events and add them to the FEL. 5. Repeat.

Chapter 5: Statistical Models in Simulation
- Useful Distributions:
  - Binomial: Number of successes in n trials.
  - Poisson: Number of events in an interval of time or space. Models arrivals.
  - Exponential: Time between events in a Poisson process. Memoryless property is key.
  - Normal: Bell curve. Models quantities that are sums of other quantities (Central Limit Theorem).
  - Uniform: All outcomes are equally likely over a range.
  - Triangular: Defined by a minimum, maximum, and most likely value.
  - Erlang: Sum of k independent exponential random variables.
  - Weibull: Models time to failure (reliability). Flexible shape.

Chapter 6: Queueing Models
- Kendall's Notation: A/B/c/N/K
  - A: Arrival process distribution (M for Markovian/Exponential)
  - B: Service time distribution (M for Markovian/Exponential, G for General)
  - c: Number of parallel servers
  - N: System capacity
  - K: Calling population size
- M/M/1 queue: Exponential arrivals, exponential service, 1 server. Formulas exist for L (avg # in system), Lq (avg # in queue), w (avg time in system), wq (avg time in queue).
- M/G/1 queue: Exponential arrivals, General service. Requires service time variance (σ^2) for formulas.

Chapter 7: Random-Number Generation
- Properties of Random Numbers: Uniformity (U[0,1]) and Independence.
- Generation Methods:
  - Linear Congruential Method (LCM): X_{i+1} = (aX_i + c) mod m. The choice of a, c, m, and X_0 is crucial for achieving a long period and good statistical properties.
- Tests for Uniformity & Independence:
  - Kolmogorov-Smirnov (K-S) test: Compares the empirical CDF with the theoretical uniform CDF.
  - Chi-square test: Groups data into intervals and compares observed vs. expected frequencies.
  - Autocorrelation test: Checks for correlation between numbers in the sequence.

Chapter 8: Random-Variate Generation
- Inverse Transform Technique: For a continuous random variable X with CDF F(x), a random variate can be generated by X = F^{-1}(R), where R is a U[0,1] random number. It's the fundamental method.
- Acceptance-Rejection Technique: Used when F^{-1} is difficult to compute. It uses a majorizing function t(x) that is easy to sample from. 1. Generate a random point from t(x). 2. If it's under the desired pdf f(x), accept it. Otherwise, reject and try again.

Chapter 9: Input Modeling
- Goal: To identify and fit a statistical distribution to real-world data collected from the system being modeled.
- Steps: 1. Collect data. 2. Identify a candidate distribution (using histograms, prior knowledge). 3. Estimate parameters for that distribution. 4. Perform a goodness-of-fit test (e.g., Chi-square, K-S) to see if the distribution is a good fit.
- If no theoretical distribution fits, an empirical distribution can be used.

Chapter 10: Verification and Validation of Simulation Models
- Verification: "Is the simulation model implemented correctly?" Checks for bugs and logical errors in the code.
- Validation: "Does the simulation model accurately represent the real system?" Compares model output to real system output.
- Techniques: Use historical data for validation. Compare model means, variances, etc., with real system data using statistical tests (e.g., t-tests, confidence intervals).

Chapter 11: Output Analysis for a Single Model
- Terminating Simulation: Runs for a specific duration or until a certain event occurs. The initial conditions are important. Analysis is typically done by running multiple replications and calculating a confidence interval on the mean of the output measure.
- Steady-State Simulation: Runs for a very long time to estimate long-run system performance. The initial conditions introduce a bias that must be dealt with, often by using a warm-up period (initialization bias deletion) or running for a very long time. Analysis is often done using the method of batch means.
`;
