import { Box } from "@mui/material";
import "./footer.scss";

const Footer = () => {
    return (
        <Box component="footer" sx={ { position: 'fixed', bottom: '0', insetInline: '0', backgroundColor: 'primary' } }>
            <div className="wrapper">
                <p>&copy; Product Inventory Managment, All rights reserved.</p>
            </div>
        </Box>
    )
}

export default Footer;