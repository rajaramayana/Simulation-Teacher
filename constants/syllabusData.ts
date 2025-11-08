
import { Unit } from '../types';

export const SYLLABUS_DATA: Unit[] = [
  {
    unit: 1,
    title: "Introduction to Simulation (6 Hrs.)",
    topics: [
      { title: "System and System Environment", subtopics: ["Concept of system and system environment"] },
      { title: "Components of System", subtopics: ["System, entities, attributes, events, state variables and other terms related to system"] },
      { title: "Discrete and Continuous System", subtopics: ["Introduction and examples"] },
      { title: "System Simulation, Model of a System, Types of Model", subtopics: ["Introduction to system simulation and system model, different types of models and examples (physical/ mathematical, static/dynamic, discrete/continuous, deterministic/stochastic)"] },
      { title: "Use of Differential and Partial differential equations in Modelling", subtopics: ["Brief review of how differential and partial differential equations can be used in system-modelling"] },
      { title: "Advantages, Disadvantages and Limitations of Simulation, Application Areas", subtopics: ["Advantages, Disadvantages, Limitations and Applications of system simulation"] },
      { title: "Phases in Simulation Study", subtopics: ["Study of different phases during simulation"] },
    ],
  },
  {
    unit: 2,
    title: "Simulation of Continuous and Discrete System (7 Hrs.)",
    topics: [
      { title: "Continuous System Models", subtopics: ["Analog Computer, Analog Methods, Hybrid Simulation, Digital-Analog Simulators, Feedback Systems", "Concept, examples, use of differential equations for modelling continuous system"] },
      { title: "Discrete Event Simulation", subtopics: ["Representation of time, Simulation Clock and Time Management", "Concept of discrete event simulation, time representation and management"] },
      { title: "Arrival Processes", subtopics: ["Poisson Processes, Non-stationary Poisson Processes, Batch Arrivals", "Concept of arrival pattern, generation of arrival pattern using Poisson and Non-stationary Poisson with example, Introduction to batch arrival processes"] },
      { title: "Models of Gathering statistics", subtopics: ["Different statistics (like counts, summary measures, utilization, occupancy, distributions etc) that are needed to generate report and methods to gather such statistics"] },
      { title: "Probability and Monte Carlo Simulation", subtopics: ["Concept with an example"] },
    ],
  },
  {
    unit: 3,
    title: "Queuing System (6 Hrs.)",
    topics: [
      { title: "Characteristics and Structure of Basic Queuing System, Models of Queuing System", subtopics: ["Concept of Basic Queuing System, Its Characteristics, Discipline, Models and related terms"] },
      { title: "Queuing notation", subtopics: ["Kendall's notation for queuing system"] },
      { title: "Single server and Multiple server Queuing Systems", subtopics: ["Concept and examples of single server and multiple server queue"] },
      { title: "Measurement of Queuing System Performance", subtopics: ["Performance evaluation of queuing system (M/M/1) in terms of parameters like average number of customers, average time spent in system and in queue per customer, server utilization, cost of waiting time and idle time, with numerical examples"] },
      { title: "Network of queuing", subtopics: ["Elementary idea about network of queuing with particular emphasis to computer system", "Introduction of network of queues"] },
      { title: "Applications of queuing system", subtopics: ["Examples of computer system related queuing systems and other applications of queuing system"] },
    ],
  },
  {
    unit: 4,
    title: "Markov Chains (2 Hrs.)",
    topics: [{ title: "Features, Process Examples, Applications", subtopics: ["Concept, Features, Examples, Applications of Markov Chains"] }],
  },
  {
    unit: 5,
    title: "Random Numbers (7 Hrs.)",
    topics: [
      { title: "Random Numbers and its properties, Pseudo Random Numbers", subtopics: ["Concept, properties and types of random numbers"] },
      { title: "Methods of generation of Random Number", subtopics: ["Linear Congruential Method (mixed and multiplicative), Mid square method"] },
      { title: "Tests for Randomness - Uniformity and independence", subtopics: ["Uniformity testing – K-S Test and Chi – square test", "Independent testing – Gap test, Auto correlation test, Poker test upto 4 digits"] },
      { title: "Random Variate Generation", subtopics: ["Random variate generation via inverse transform technique and acceptance-rejection technique"] },
    ],
  },
  {
    unit: 6,
    title: "Verification and Validation (4 Hrs.)",
    topics: [{ title: "Design and Validation of Simulation Models", subtopics: ["Verification of Simulation Models, Calibration and Validation of the models, Three-Step Approach for Validation of Simulation Models, Accreditation of Models", "Concept of Model Building; verification; validation and calibration; three step approach, Introduction to accreditation of models"] }],
  },
  {
    unit: 7,
    title: "Analysis of Simulation Output (4 Hrs.)",
    topics: [{ title: "Confidence Intervals and Hypothesis Testing", subtopics: ["Estimation Methods (Point Estimation and confidence interval with examples), Simulation run statistics, Replication of runs, Elimination of initial bias"] }],
  },
  {
    unit: 8,
    title: "Simulation of Computer Systems (9 Hrs.)",
    topics: [
      { title: "Simulation Tools" },
      { title: "Simulation Languages - GPSS", subtopics: ["study and use of language with related problem", "study of different blocks of GPSS blocks", "concept of queue, storage, facility, multi-server queue, decision making"] },
      { title: "Case Studies of different types of Simulation Models", subtopics: ["Construction of sample mathematical models"] },
    ],
  },
];
