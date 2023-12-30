import styles from "./styles.module.css"; // Your CSS file path

const TestComp = () => {
  /*
   
   
  //state for steps
  const [step, setstep] = useState(1);

  //state for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: ""
  })

  // function for going to next step by increasing step state by 1
  const nextStep = () => {
    setstep(step + 1);
  };

  // function for going to previous step by decreasing step state by 1
  const prevStep = () => {
    setstep(step - 1);
  };

  // handling form input data by taking onchange value and updating our previous form data state
  const handleInputData = input => e => {
    // input value from the form
    const {value } = e.target;

    //updating for data state taking previous state and then adding new value to create new object
    setFormData(prevState => ({
      ...prevState,
      [input]: value
  }));
  }


// javascript switch case to show different form in each step
  switch (step) {
    // case 1 to show stepOne form and passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 1:
      return (
        <div className="App">
          <Container>
            <Row>
              <Col  md={{ span: 6, offset: 3 }} className="custom-margin">
                <StepOne nextStep={nextStep} handleFormData={handleInputData} values={formData} />
              </Col>
            </Row>
          </Container>
        </div>
      );
    // case 2 to show stepTwo form passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 2:
      return (
        <div className="App">
          <Container>
            <Row>
              <Col  md={{ span: 6, offset: 3 }} className="custom-margin">
                <StepTwo nextStep={nextStep} prevStep={prevStep} handleFormData={handleInputData} values={formData} />
              </Col>
            </Row>
          </Container>
        </div>
      );
      // Only formData is passed as prop to show the final value at form submit
    case 3:
      return (
        <div className="App">
          <Container>
            <Row>
              <Col  md={{ span: 6, offset: 3 }} className="custom-margin">
                <Final values={formData}  />
              </Col>
            </Row>
          </Container>
        </div>
      );
    // default case to show nothing
    default:
      return (
        <div className="App">
        </div>
      );
  }*/
  // return (
  //   <div className={styles.container}>
  //     <h2>Başvuru Listesi</h2>
  //     <ul className={styles.responsiveTable}>
  //       <li className={styles.tableHeader}>
  //         <div className={styles.col + " " + styles.col1}>Job Id</div>
  //         <div className={styles.col + " " + styles.col2}>Customer Name</div>
  //         <div className={styles.col + " " + styles.col3}>Amount Due</div>
  //         <div className={styles.col + " " + styles.col4}>Payment Status</div>
  //       </li>
  //       <li className={styles.tableRow}>
  //         <div className={styles.col + " " + styles.col1} data-label="Job Id">
  //           42235
  //         </div>
  //         <div
  //           className={styles.col + " " + styles.col2}
  //           data-label="Customer Name"
  //         >
  //           John Doe
  //         </div>
  //         <div className={styles.col + " " + styles.col3} data-label="Amount">
  //           $350
  //         </div>
  //         <div
  //           className={styles.col + " " + styles.col4}
  //           data-label="Payment Status"
  //         >
  //           Pending
  //         </div>
  //       </li>
  //       <li className={styles.tableRow}>
  //         <div className={styles.col + " " + styles.col1} data-label="Job Id">
  //           42442
  //         </div>
  //         <div
  //           className={styles.col + " " + styles.col2}
  //           data-label="Customer Name"
  //         >
  //           Jennifer Smith
  //         </div>
  //         <div className={styles.col + " " + styles.col3} data-label="Amount">
  //           $220
  //         </div>
  //         <div
  //           className={styles.col + " " + styles.col4}
  //           data-label="Payment Status"
  //         >
  //           Pending
  //         </div>
  //       </li>
  //       <li className={styles.tableRow}>
  //         <div className={styles.col + " " + styles.col1} data-label="Job Id">
  //           42257
  //         </div>
  //         <div
  //           className={styles.col + " " + styles.col2}
  //           data-label="Customer Name"
  //         >
  //           John Smith
  //         </div>
  //         <div className={styles.col + " " + styles.col3} data-label="Amount">
  //           $341
  //         </div>
  //         <div
  //           className={styles.col + " " + styles.col4}
  //           data-label="Payment Status"
  //         >
  //           Pending
  //         </div>
  //       </li>
  //       <li className={styles.tableRow}>
  //         <div className={styles.col + " " + styles.col1} data-label="Job Id">
  //           42311
  //         </div>
  //         <div
  //           className={styles.col + " " + styles.col2}
  //           data-label="Customer Name"
  //         >
  //           John Carpenter
  //         </div>
  //         <div className={styles.col + " " + styles.col3} data-label="Amount">
  //           $115
  //         </div>
  //         <div
  //           className={styles.col + " " + styles.col4}
  //           data-label="Payment Status"
  //         >
  //           Pending
  //         </div>
  //       </li>
  //     </ul>
  //   </div>
  // );
};

export default TestComp;
