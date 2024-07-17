import { Box, Button, Center, Heading, Image, resolveStyleConfig, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import eventlogo from '../../public/event-logo.png'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import jsPDF from 'jspdf'
const TempCertificate = () => {
  const user = useSelector((state) => state.user)
  const event = useParams()
  const [data, setData] = useState(null)
  const [userdata, setUserdata] = useState(null)
  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/certificate/get-certificate/${event.id}`, {
          withCredentials: true
        })
        console.log(response)
        console.log(response?.data?.data?.certificate);
        setData(response?.data?.data?.certificate);
        setUserdata(response?.data?.data?.user);

      } catch (error) {
        console.log(error);
      }
    }
    fetchCertificate();

  }, [])

  const handleDownloadPdf = () => {
    console.log("ma click hua")
    // const pdf = new jsPDF('p', 'pt','a4 ');
    const pdf= new jsPDF({
      orientation:"landscape",
      unit:"px",
      format:[800,1000]
    })
    const certificateHtml = document.getElementById('certificate-html');
    pdf.html(certificateHtml, {
      callback: function(pdf) {
        const pdfBlob = pdf.output('blob');
        const url = URL.createObjectURL(pdfBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'certificate.pdf';
        a.click();
      }
    });
  }


  return (
    <>
    {data ?<Button onClick={handleDownloadPdf} backgroundColor="black" color="white" width="100%">Download Certificate </Button>:""}
      <Box width="100%" height="100vh" display="flex" justifyContent="center" alignItems="center">

        {data ?
          <Box id='certificate-html' width="1000px" height="800px" border="10px solid black" display="flex" flexDirection="column"  >
            <Box height="40%" display="flex" justifyContent="space-around">
              <Image src={eventlogo} width="400px" height="100%" objectFit="contain" alt="weblogo" />
              <Image src={data?.companyLogo} width="200px" height="100%" objectFit="contain" alt="Companylogo" />
            </Box>
            <Center display="flex" flexDirection="column" gap="10px">
              <Heading>{data?.companyName}</Heading>
              <Heading fontWeight="600">Certificate of Participation</Heading>
              <Text fontSize="28px">This is to certify that</Text>
              <Heading fontSize="35px" fontWeight="600">{userdata ? userdata?.username : "Username"}</Heading>
              <Text fontSize="28px">has successfully participated in the event</Text>
              <Heading fontSize="35px" fontWeight="600">{data?.event?.eventName}</Heading>
              <Text fontSize="28px">start on {data?.event?.startDate?.split('T')[0]}</Text>
            </Center>
          </Box> : "NO Certificate Found"
        }
      </Box>
      
    </>

  )
}

export default TempCertificate