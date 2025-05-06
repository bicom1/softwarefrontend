import React,{useState} from 'react'
import { Input} from 'reactstrap'
import { ppcApi } from '../features/userApis'
import BtnLoader from './loader/BtnLoader'
import { useNavigate } from 'react-router-dom'

const PpcForm = () => {
    const navigate = useNavigate()
    const [load,setLoad] = useState(false)
    const [ppc,setPpc] = useState({
            leadId:'',
            mod:'',
            source:'',
            agentName:'',
            teamleader:'',
            greetings:'',
            accuracy:'',
            building:'',
            presenting:'',
            concern:'',
            closing:'',
            numberOfFollow:'',
            leadQuality:'',
            QcCategory:'',
            summary:'',
    })

    const handlerChangePpc = (name,value) => {
        setPpc((pre) => ({
          ...pre,
          [name]:value
        }))
    }

    const handlerPpcForm = async () => {
        setLoad(true)
        if(
          ppc.leadId.trim() === '' ||
          ppc.mod.trim() === '' ||
          ppc.source.trim() === '' ||
          ppc.agentName.trim() === '' ||
          ppc.teamleader.trim() === '' ||
          ppc.greetings.trim() === '' ||
          ppc.accuracy.trim() === '' ||
          ppc.building.trim() === '' ||
          ppc.presenting.trim() === '' ||
          ppc.concern.trim() === '' ||
          ppc.closing.trim() === '' ||
          ppc.numberOfFollow.trim() === '' ||
          ppc.leadQuality.trim() === '' ||
          ppc.QcCategory.trim() === '' ||
          ppc.summary.trim() === ''
        ){
          alert("Please fill fields!")
          setLoad(false)
          return
        }else{
          const data = await ppcApi(ppc)
          if(data.data.success){
            setPpc({
                leadId:'',
                mod:'',
                source:'',
                agentName:'',
                teamleader:'',
                greetings:'',
                accuracy:'',
                building:'',
                presenting:'',
                concern:'',
                closing:'',
                numberOfFollow:'',
                leadQuality:'',
                QcCategory:'',
                summary:'',
            })
            alert("Successfully Created!")
            navigate('/bi/profile')
            window.location.reload();
            setLoad(false)
          }
        }
      }

    console.log("ppc",ppc)

  return (
    <div className='d-flex justify-content-center'>
        <div className='w-50 bg-gray d-flex flex-column gap-3'>
            <div className='rounded d-flex justify-content-center flex-column align-items-center bg-card-color'>
                <h1 className='fw-bolder'>BI COMM</h1>
                <h3 className='text-center text-success'>Quality Control - Form Lead enquiry reference to the sales agent</h3>
            </div>
            <div className='rounded d-flex justify-content-center flex-column bg-card-color'>
                <div className='d-flex flex-start p-4'>
                    <label>Enter Lead Id: <br />
                        <Input 
                            type="text" 
                            placeholder="Enter Lead Id"
                            required 
                            value={ppc.leadId}
                            onChange={(e) => handlerChangePpc('leadId',e.target.value)} 
                        />
                    </label>
                </div>
            </div>
            <div className='bg-card-color rounded d-flex justify-content-center flex-column'>
                <div className=' p-4'>    
                    <h3>Mode of Communication</h3>
                    <label className='d-flex align-items-center gap-2'>
                        <Input className='m-2' 
                            type="radio" id="moc" name="moc" value="Form" 
                            checked={ppc.mod==='Form'}
                            onChange={(e) => {
                                handlerChangePpc('mod',e.target.value)
                            }}
                        />
                        Form
                    </label> <br />
                    <label className='d-flex align-items-center gap-2'>
                        <Input className='m-2' 
                            type="radio" id="moc" name="moc" value="Call" 
                            checked={ppc.mod==='Call'}
                            onChange={(e) => {
                                handlerChangePpc('mod',e.target.value)
                            }}
                        />
                        Call
                    </label> <br />
                    <label className='d-flex align-items-center gap-2'>
                        <Input className='m-2' 
                            type="radio" id="moc" name="moc" value="Wazzup/Whatsapp" 
                            checked={ppc.mod==='Wazzup/Whatsapp'}
                            onChange={(e) => {
                                handlerChangePpc('mod',e.target.value)
                            }}
                        />
                        Wazzup/Whatsapp
                    </label> <br />
                    <label className='d-flex align-items-center gap-2'>
                        <Input className='m-2' 
                            type="radio" id="moc" name="moc" value="live chats" 
                            checked={ppc.mod==='live chats'}
                            onChange={(e) => {
                                handlerChangePpc('mod',e.target.value)
                            }}
                        />
                        Live Chats
                    </label> <br />
                    <label className='d-flex align-items-center gap-2'>
                        <Input className='m-2' 
                            type="radio" id="moc" name="moc" value="facebook" 
                            checked={ppc.mod==='facebook'}
                            onChange={(e) => {
                                handlerChangePpc('mod',e.target.value)
                            }}
                        />
                        Facebook
                    </label> <br />
                    <label className='d-flex align-items-center gap-2'>
                        <Input className='m-2' 
                            type="radio" id="moc" name="moc" value="instagram" 
                            checked={ppc.mod==='instagram'}
                            onChange={(e) => {
                                handlerChangePpc('mod',e.target.value)
                            }}
                        />
                        Instagram
                    </label> <br />
                </div>
            </div>
            <div className='bg-card-color rounded d-flex justify-content-center flex-column'>
                <div className='p-4'>
                    <h3>Source</h3>
                    <label className='d-flex align-items-center gap-2'>
                        <Input className='m-2' 
                            type="radio" id="source" name="source" value="ppc dubai 0" 
                            checked={ppc.source==='ppc dubai 0'}
                            onChange={(e) => {
                                handlerChangePpc('source',e.target.value)
                            }}
                        />
                        PPC Dubai 0
                    </label> <br />
                    <label className='d-flex align-items-center gap-2'>
                        <Input className='m-2' 
                            type="radio" id="source" name="source" value="ppc fahad dubai" 
                            checked={ppc.source==='ppc fahad dubai'}
                            onChange={(e) => {
                                handlerChangePpc('source',e.target.value)
                            }}
                        />
                        PPC fahad Dubai
                    </label> <br />
                    <label className='d-flex align-items-center gap-2'>
                        <Input className='m-2' 
                            type="radio" id="source" name="source" value="ppc fawad livechat" 
                            checked={ppc.source==='ppc fawad livechat'}
                            onChange={(e) => {
                                handlerChangePpc('source',e.target.value)
                            }}
                        />
                        PPC fawad livechat
                    </label> <br />
                </div>
            </div>
            <div className='rounded d-flex justify-content-center flex-column bg-card-color'>
                <div className='d-flex flex-start p-4'>
                    <label>Enter Agent Name: <br />
                        <Input 
                            type="text" 
                            placeholder="Enter Agent Name"
                            required 
                            value={ppc.agentName}
                            onChange={(e) => handlerChangePpc('agentName',e.target.value)} 
                        />
                    </label>
                </div>
            </div>
            <div className='bg-card-color rounded d-flex justify-content-center flex-column'>
                <div className='p-4'>
                    <h3>Team Leader</h3>
                    <label className='d-flex align-items-center gap-2'>
                        <Input className='m-2' 
                            type="radio" id="teamlead" name="teamlead" value="fawad ali (erc dubai)" 
                            checked={ppc.teamleader==='fawad ali (erc dubai)'}
                            onChange={(e) => {
                                handlerChangePpc('teamleader',e.target.value)
                            }}
                        />
                        Fawad Ali (ERC Dubai)
                    </label> <br />
                    <label className='d-flex align-items-center gap-2'>
                        <Input className='m-2' 
                            type="radio" id="teamlead" name="teamlead" value="muhammad abdullah akram (erc abu dhabi)" 
                            checked={ppc.teamleader==='muhammad abdullah akram (erc abu dhabi)'}
                            onChange={(e) => {
                                handlerChangePpc('teamleader',e.target.value)
                            }}
                        />
                        Muhammad Abdullah Akram (ERC Abu Dhabi)
                    </label> <br />
                    <label className='d-flex align-items-center gap-2'>
                        <Input className='m-2' 
                            type="radio" id="teamlead" name="teamlead" value="muhammad abubakar (dynamic)" 
                            checked={ppc.teamleader==='muhammad abubakar (dynamic)'}
                            onChange={(e) => {
                                handlerChangePpc('teamleader',e.target.value)
                            }}
                        />
                        Muhammad Abubakar (Dynamic)
                    </label> <br />
                    <label className='d-flex align-items-center gap-2'>
                        <Input className='m-2' 
                            type="radio" id="teamlead" name="teamlead" value="yousef almaani (jordan)" 
                            checked={ppc.teamleader==='yousef almaani (jordan)'}
                            onChange={(e) => {
                                handlerChangePpc('teamleader',e.target.value)
                            }}
                        />
                        Youset Almaani (Jordan)
                    </label> <br />
                </div>
            </div>
            <div className='bg-card-color rounded d-flex justify-content-center flex-column'>
                <div className='p-4'>
                    <h3>Greetings</h3>
                    <label className='d-flex align-items-center gap-2'>
                        <Input className='m-2' 
                            type="radio" id="greeting" name="greeting" value="excellent" 
                            checked={ppc.greetings==='excellent'}
                            onChange={(e) => {
                                handlerChangePpc('greetings',e.target.value)
                            }}
                        />
                        Excellent
                    </label> <br />
                    <label className='d-flex align-items-center gap-2'>
                        <Input className='m-2' 
                            type="radio" id="greeting" name="greeting" value="good" 
                            checked={ppc.greetings==='good'}
                            onChange={(e) => {
                                handlerChangePpc('greetings',e.target.value)
                            }}
                        />
                        Good
                    </label> <br />
                    <label className='d-flex align-items-center gap-2'>
                        <Input className='m-2' 
                            type="radio" id="greeting" name="greeting" value="fair" 
                            checked={ppc.greetings==='fair'}
                            onChange={(e) => {
                                handlerChangePpc('greetings',e.target.value)
                            }}
                        />
                        Fair
                    </label> <br />
                    <label className='d-flex align-items-center gap-2'>
                        <Input className='m-2' 
                            type="radio" id="greeting" name="greeting" value="poor" 
                            checked={ppc.greetings==='poor'}
                            onChange={(e) => {
                                handlerChangePpc('greetings',e.target.value)
                            }}
                        />
                        Poor
                    </label> <br />
                </div>
            </div>
            <div className='bg-card-color rounded d-flex justify-content-center flex-column'>
                <div className='p-4'>
                    <h3>Accuracy & Compliance</h3>
                    <label className='d-flex align-items-center gap-2'>
                        <Input className='m-2' 
                            type="radio" id="ac" name="ac" value="ask clear" 
                            checked={ppc.accuracy==='ask clear'}
                            onChange={(e) => {
                                handlerChangePpc('accuracy',e.target.value)
                            }}
                        />
                        Ask clear, concise questions to accurately identify customer needs or inquiries.
                    </label> <br />
                    <label className='d-flex align-items-center gap-2'>
                        <Input className='m-2' 
                            type="radio" id="ac" name="ac" value="not up to mark" 
                            checked={ppc.accuracy==='not up to mark'}
                            onChange={(e) => {
                                handlerChangePpc('accuracy',e.target.value)
                            }}
                        />
                        Not up to the mark
                    </label> <br />
                </div>
            </div>
            <div className='bg-card-color rounded d-flex justify-content-center flex-column'>
                <div className='p-4'>
                    <h3>Building Rapport & Discovery</h3>
                    <label className='d-flex align-items-center gap-2'>
                        <Input className='m-2' 
                            type="radio" id="bpd" name="bpd" value="use open ended" 
                            checked={ppc.building==='use open ended'}
                            onChange={(e) => {
                                handlerChangePpc('building',e.target.value)
                            }}
                        />
                        Use open-ended questions to understand customer needs, showing active listening.
                    </label> <br />
                    <label className='d-flex align-items-center gap-2'>
                        <Input className='m-2' 
                            type="radio" id="bpd" name="bpd" value="not up to mark" 
                            checked={ppc.building==='not up to mark'}
                            onChange={(e) => {
                                handlerChangePpc('building',e.target.value)
                            }}
                        />
                        Not up to the mark
                    </label> <br />
                </div>
            </div>
            <div className='bg-card-color rounded d-flex justify-content-center flex-column'>
                <div className='p-4'>
                    <h3>Presenting Solutions & Making the Sale</h3>
                    <label className='d-flex align-items-center gap-2'>
                        <Input className='m-2' 
                            type="radio" id="psm" name="psm" value="professionally handle" 
                            checked={ppc.presenting==='professionally handle'}
                            onChange={(e) => {
                                handlerChangePpc('presenting',e.target.value)
                            }}
                        />
                        Professionally handle objections and guide customers to schedule appointments.
                    </label> <br />
                    <label className='d-flex align-items-center gap-2'>
                        <Input className='m-2' 
                            type="radio" id="psm" name="psm" value="not up to mark" 
                            checked={ppc.presenting==='not up to mark'}
                            onChange={(e) => {
                                handlerChangePpc('presenting',e.target.value)
                            }}
                        />
                        Not up to the mark
                    </label> <br />
                </div>
            </div>
            <div className='bg-card-color rounded d-flex justify-content-center flex-column'>
                <div className='p-4'>
                    <h3>Addressing The Client Concern </h3>
                    <label className='d-flex align-items-center gap-2'>
                        <Input className='m-2' 
                            type="radio" id="acc" name="acc" value="Good" 
                            checked={ppc.concern==='Good'}
                            onChange={(e) => {
                                handlerChangePpc('concern',e.target.value)
                            }}
                        />
                        Good
                    </label> <br />
                    <label className='d-flex align-items-center gap-2'>
                        <Input className='m-2' 
                            type="radio" id="acc" name="acc" value="Satisfactory" 
                            checked={ppc.concern==='Satisfactory'}
                            onChange={(e) => {
                                handlerChangePpc('concern',e.target.value)
                            }}
                        />
                        Satisfactory
                    </label> <br />
                    <label className='d-flex align-items-center gap-2'>
                        <Input className='m-2' 
                            type="radio" id="acc" name="acc" value="poor" 
                            checked={ppc.concern==='poor'}
                            onChange={(e) => {
                                handlerChangePpc('concern',e.target.value)
                            }}
                        />
                        Poor
                    </label> <br />
                </div>
            </div>
            <div className='bg-card-color rounded d-flex justify-content-center flex-column'>
                <div className='p-4'>
                    <h3>Call Closing & Securing Commitment</h3>
                    <label className='d-flex align-items-center gap-2'>
                        <Input className='m-2' 
                            type="radio" id="ccsc" name="ccsc" value="scheduling callbacks" 
                            checked={ppc.closing==='scheduling callbacks'}
                            onChange={(e) => {
                                handlerChangePpc('closing',e.target.value)
                            }}
                        />
                       Summarize key points and outline next steps (scheduling callbacks or appointments).
                    </label> <br />
                    <label className='d-flex align-items-center gap-2'>
                        <Input className='m-2' 
                            type="radio" id="ccsc" name="ccsc" value="not up to mark" 
                            checked={ppc.closing==='not up to mark'}
                            onChange={(e) => {
                                handlerChangePpc('closing',e.target.value)
                            }}
                        />
                        Not up to the mark
                    </label> <br />
                </div>
            </div>
            <div className='rounded d-flex justify-content-center flex-column bg-card-color'>
                <div className='d-flex flex-start p-4'>
                    <label>Number Follow Up (If Any) <br />
                        <Input 
                            type="text" 
                            placeholder="Enter Number Follow Up"
                            required 
                            value={ppc.numberOfFollow}
                            onChange={(e) => handlerChangePpc('numberOfFollow',e.target.value)} 
                        />
                    </label>
                </div>
            </div>
            <div className='bg-card-color rounded d-flex justify-content-center flex-column'>
                <div className='p-4'>
                    <h3>Lead Quality</h3>
                    <label className='d-flex align-items-center gap-2'>
                        <Input className='m-2' 
                            type="radio" id="leadquality" name="leadquality" value="interested" 
                            checked={ppc.leadQuality==='interested'}
                            onChange={(e) => {
                                handlerChangePpc('leadQuality',e.target.value)
                            }}
                        />
                       Interested
                    </label> <br />
                    <label className='d-flex align-items-center gap-2'>
                        <Input className='m-2' 
                            type="radio" id="leadquality" name="leadquality" value="Interested in Other Procedure" 
                            checked={ppc.leadQuality==='Interested in Other Procedure'}
                            onChange={(e) => {
                                handlerChangePpc('leadQuality',e.target.value)
                            }}
                        />
                        Interested in Other Procedure
                    </label> <br />
                    <label className='d-flex align-items-center gap-2'>
                        <Input className='m-2' 
                            type="radio" id="leadquality" name="leadquality" value="Not Interested" 
                            checked={ppc.leadQuality==='Not Interested'}
                            onChange={(e) => {
                                handlerChangePpc('leadQuality',e.target.value)
                            }}
                        />
                        Not Interested
                    </label> <br />
                    <label className='d-flex align-items-center gap-2'>
                        <Input className='m-2' 
                            type="radio" id="leadquality" name="leadquality" value="Can't Afford" 
                            checked={ppc.leadQuality==="Can't Afford"}
                            onChange={(e) => {
                                handlerChangePpc('leadQuality',e.target.value)
                            }}
                        />
                        Can't Afford
                    </label> <br />
                    <label className='d-flex align-items-center gap-2'>
                        <Input className='m-2' 
                            type="radio" id="leadquality" name="leadquality" value="Spam" 
                            checked={ppc.leadQuality==="Spam"}
                            onChange={(e) => {
                                handlerChangePpc('leadQuality',e.target.value)
                            }}
                        />
                        Spam
                    </label> <br />
                </div>
            </div>
            <div className='bg-card-color rounded d-flex justify-content-center flex-column'>
                <div className='p-4'>
                    <h3>QC Category</h3>
                    <label className='d-flex align-items-center gap-2'>
                        <Input className='m-2' 
                            type="radio" id="qc" name="qc" value="Late Response" 
                            checked={ppc.QcCategory==='Late Response'}
                            onChange={(e) => {
                                handlerChangePpc('QcCategory',e.target.value)
                            }}
                        />
                       Late Response
                    </label> <br />
                    <label className='d-flex align-items-center gap-2'>
                        <Input className='m-2' 
                            type="radio" id="qc" name="qc" value="Unresponsive" 
                            checked={ppc.QcCategory==='Unresponsive'}
                            onChange={(e) => {
                                handlerChangePpc('QcCategory',e.target.value)
                            }}
                        />
                        Unresponsive
                    </label> <br />
                    <label className='d-flex align-items-center gap-2'>
                        <Input className='m-2' 
                            type="radio" id="qc" name="qc" value="Wrongly Marked" 
                            checked={ppc.QcCategory==='Wrongly Marked'}
                            onChange={(e) => {
                                handlerChangePpc('QcCategory',e.target.value)
                            }}
                        />
                        Wrongly Marked
                    </label> <br />
                    <label className='d-flex align-items-center gap-2'>
                        <Input className='m-2' 
                            type="radio" id="qc" name="qc" value="Duplicate Lead" 
                            checked={ppc.QcCategory==='Duplicate Lead'}
                            onChange={(e) => {
                                handlerChangePpc('QcCategory',e.target.value)
                            }}
                        />
                        Duplicate Lead
                    </label> <br />
                </div>
            </div>
            <div className='rounded d-flex justify-content-center flex-column bg-card-color'>
                <div className='d-flex flex-start p-4'>
                    <label className='w-full'>Summary <br />
                        <textarea 
                            type="text" 
                            placeholder="Enter Summary"
                            required 
                            rows="3"
                            class="form-control mt-1 w-full"
                            value={ppc.summary}
                            onChange={(e) => handlerChangePpc('summary',e.target.value)} 
                        ></textarea>
                    </label>
                </div>
            </div>
            <div className='p-4'>
                <button type="button" class="btn btn-lg d-flex gap-2 justify-content-center align-content-center" style={{backgroundColor:'#39c449',color:'#fff'}} 
                    onClick={handlerPpcForm} 
                    disabled={load}>
                    Submit {load && <BtnLoader/>}
                </button>
            </div>
        </div>
    </div>
  )
}

export default PpcForm
